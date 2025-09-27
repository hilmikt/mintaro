"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useWeb3ModalReady } from "../AppProviders";
import {
  fetchProfileFromCid,
  persistProfileCid,
  readStoredCid,
  type ProfileFetchResponse,
} from "../../lib/profileClient";

interface ProfileFormState {
  name: string;
  bio: string;
  role: "client" | "freelancer";
  skillsText: string;
  requirementsText: string;
  website: string;
}

const emptyState: ProfileFormState = {
  name: "",
  bio: "",
  role: "freelancer",
  skillsText: "",
  requirementsText: "",
  website: "",
};

function splitLines(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const isWeb3ModalReady = useWeb3ModalReady();
  const [form, setForm] = useState<ProfileFormState>(emptyState);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loadingExisting, setLoadingExisting] = useState(false);

  useEffect(() => {
    if (!address || !isConnected) {
      setForm(emptyState);
      setCid(null);
      setImagePreview(null);
      return;
    }

    const storedCid = readStoredCid(address);
    if (!storedCid) {
      setForm((current) => ({ ...emptyState, role: current.role }));
      setCid(null);
      setImagePreview(null);
      return;
    }

    setLoadingExisting(true);
    fetchProfileFromCid(address, storedCid)
      .then((data: ProfileFetchResponse) => {
        setCid(data.cid);
        setForm({
          name: data.profile.name ?? "",
          bio: data.profile.bio ?? "",
          role: data.profile.role ?? "freelancer",
          skillsText: data.profile.skills?.join(", ") ?? "",
          requirementsText: data.profile.requirements?.join(", ") ?? "",
          website: data.profile.website ?? "",
        });
        setImagePreview(data.imageUrl);
      })
      .catch(() => {
        setStatusMessage(null);
      })
      .finally(() => {
        setLoadingExisting(false);
      });
  }, [address, isConnected]);

  useEffect(() => {
    setError(null);
    setStatusMessage(null);
  }, [form.name, form.bio, form.role, form.skillsText, form.requirementsText, form.website]);

  const handleInput = (key: keyof ProfileFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "client" ? "client" : "freelancer";
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address) {
      setError("Connect your wallet to save a profile.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setStatusMessage("Saving profile to Filecoin...");

      const imageDataUrl = imagePreview && imageFile ? imagePreview : null;

      const payload = {
        address,
        role: form.role,
        name: form.name.trim(),
        bio: form.bio.trim(),
        skills: splitLines(form.skillsText),
        requirements: splitLines(form.requirementsText),
        website: form.website.trim(),
        image: imageDataUrl
          ? {
              dataUrl: imageDataUrl,
              fileName: imageFile?.name ?? `profile-${address}.png`,
              mimeType: imageFile?.type ?? "image/png",
            }
          : undefined,
      };

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to store profile");
      }

      const { cid: newCid } = (await response.json()) as { cid: string };
      setCid(newCid);
      persistProfileCid(address, newCid);
      setStatusMessage("Profile saved and pinned to Filecoin ??");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to save profile";
      setError(message);
      setStatusMessage(null);
    } finally {
      setSaving(false);
    }
  };

  if (!isWeb3ModalReady) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-5xl items-center justify-center px-4 py-12 text-neutral-400">
        Preparing wallet connection...
      </main>
    );
  }

  if (!isConnected || !address) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center text-neutral-300">
        <h1 className="text-3xl font-semibold text-neutral-100">Create your Mintaro profile</h1>
        <p className="max-w-xl text-sm text-neutral-400">
          Connect your wallet to start building a profile for the Mintaro marketplace. Your details are stored on Filecoin so you can carry them across clients and gigs.
        </p>
        <Link
          href="/"
          className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500"
        >
          Go back and connect wallet
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-5xl px-4 py-12 text-neutral-100">
      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="max-w-2xl text-sm text-neutral-400">
          Share who you are, what you work on, and what you need. We store this metadata on Filecoin via web3.storage so it remains portable and verifiable.
        </p>
        {cid ? (
          <div className="text-xs text-emerald-400">
            Stored at CID: {cid}
          </div>
        ) : null}
      </header>

      <section className="grid gap-10 lg:grid-cols-[2fr_1.2fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300">
              Display name
            </label>
            <input
              value={form.name}
              onChange={handleInput("name")}
              placeholder="e.g. Ada Lovelace"
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={handleInput("bio")}
              rows={4}
              placeholder="Short description about your experience and interests"
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-300">
                Marketplace role
              </label>
              <select
                value={form.role}
                onChange={handleRoleChange}
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="freelancer">Freelancer / gig hunter</option>
                <option value="client">Client / hiring</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300">
                Website or portfolio (optional)
              </label>
              <input
                value={form.website}
                onChange={handleInput("website")}
                placeholder="https://"
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-300">
                Skills / focus areas (comma separated)
              </label>
              <textarea
                value={form.skillsText}
                onChange={handleInput("skillsText")}
                rows={3}
                placeholder="Smart contracts, audits, UI/UX"
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300">
                Requirements / offers (comma separated)
              </label>
              <textarea
                value={form.requirementsText}
                onChange={handleInput("requirementsText")}
                rows={3}
                placeholder="Looking for DeFi builds, prefer milestone payouts"
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300">
              Profile image (stored alongside your metadata)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="mt-2 w-full text-sm text-neutral-400 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-800 file:px-4 file:py-2 file:text-neutral-200 hover:file:bg-neutral-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            {loadingExisting ? (
              <span className="text-xs text-neutral-500">Loading stored data…</span>
            ) : null}
            {statusMessage ? (
              <span className="text-xs text-emerald-400">{statusMessage}</span>
            ) : null}
            {error ? <span className="text-xs text-red-400">{error}</span> : null}
          </div>
        </form>

        <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold text-neutral-200">Preview</h2>
          <p className="text-xs text-neutral-400">
            This is how hiring partners or freelancers will see you.
          </p>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-neutral-800 bg-neutral-800">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
                  No image
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-100">
                {form.name || "Your name"}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-emerald-400">
                {form.role === "client" ? "Client" : "Freelancer"}
              </p>
              <p className="mt-3 text-sm text-neutral-300">
                {form.bio || "Share a short introduction to show what you bring."}
              </p>
            </div>
            <div className="w-full space-y-3 text-left text-sm">
              {form.skillsText ? (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Skills
                  </h4>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {splitLines(form.skillsText).map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {form.requirementsText ? (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {form.role === "client" ? "Project needs" : "Offers"}
                  </h4>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {splitLines(form.requirementsText).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {form.website ? (
                <Link
                  href={form.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300"
                >
                  Visit website ?
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}