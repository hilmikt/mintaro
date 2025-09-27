import { Buffer } from "node:buffer";
import { Web3Storage, File } from "web3.storage";

interface ProfileInput {
  address: string;
  role: "client" | "freelancer";
  name: string;
  bio: string;
  skills: string[];
  requirements: string[];
  website?: string;
  image?: {
    dataUrl: string;
    fileName: string;
    mimeType: string;
  };
}

const missingTokenMessage =
  "WEB3_STORAGE_TOKEN environment variable is required to save profiles.";

function ensureToken() {
  const token = process.env.WEB3_STORAGE_TOKEN;
  if (!token) {
    throw new Error(missingTokenMessage);
  }
  return token;
}

function buildProfileFile(input: ProfileInput) {
  const payload = {
    address: input.address,
    name: input.name,
    bio: input.bio,
    role: input.role,
    skills: input.skills,
    requirements: input.requirements,
    website: input.website,
    imageFileName: input.image?.fileName ?? null,
    updatedAt: new Date().toISOString(),
  };

  const json = JSON.stringify(payload, null, 2);
  return new File([json], `profile-${input.address}.json`, {
    type: "application/json",
  });
}

function buildImageFile(image: NonNullable<ProfileInput["image"]>, address: string) {
  const base64 = image.dataUrl.split(",")[1];
  const buffer = Buffer.from(base64, "base64");
  return new File([buffer], image.fileName || `profile-${address}.png`, {
    type: image.mimeType || "image/png",
  });
}

export async function POST(request: Request) {
  try {
    const token = ensureToken();
    const payload = (await request.json()) as ProfileInput;

    if (!payload?.address) {
      return new Response("Wallet address is required", { status: 400 });
    }

    const files: File[] = [buildProfileFile(payload)];

    if (payload.image?.dataUrl) {
      files.push(buildImageFile(payload.image, payload.address));
    }

    const client = new Web3Storage({ token });
    const cid = await client.put(files, {
      wrapWithDirectory: true,
      name: `mintaro-profile-${payload.address}`,
    });

    return Response.json({ cid });
  } catch (error) {
    console.error("Failed to store profile", error);
    const message =
      error instanceof Error ? error.message : "Unable to store profile";

    return new Response(message, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get("cid");
  const address = searchParams.get("address");

  if (!cid || !address) {
    return new Response("cid and address query params are required", {
      status: 400,
    });
  }

  const profileUrl = `https://w3s.link/ipfs/${cid}/profile-${address}.json`;
  const response = await fetch(profileUrl, { cache: "no-store" });

  if (!response.ok) {
    return new Response("Profile not found", { status: 404 });
  }

  const profile = await response.json();
  const imageUrl = profile.imageFileName
    ? `https://w3s.link/ipfs/${cid}/${profile.imageFileName}`
    : null;

  return Response.json({ profile, cid, imageUrl });
}

