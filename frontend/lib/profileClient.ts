export interface MintaroProfile {
  address: string;
  name: string;
  bio: string;
  role: "client" | "freelancer";
  skills: string[];
  requirements: string[];
  website?: string;
  imageFileName?: string | null;
  updatedAt: string;
}

export interface ProfileFetchResponse {
  profile: MintaroProfile;
  cid: string;
  imageUrl: string | null;
}

export const profileLocalKey = (address: string) => `mintaro-profile-${address}`;

export function readStoredCid(address: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(profileLocalKey(address));
}

export function persistProfileCid(address: string, cid: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(profileLocalKey(address), cid);
}

export async function fetchProfileFromCid(
  address: string,
  cid: string
): Promise<ProfileFetchResponse> {
  const response = await fetch(`/api/profile?cid=${cid}&address=${address}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Profile not found");
  }

  return (await response.json()) as ProfileFetchResponse;
}