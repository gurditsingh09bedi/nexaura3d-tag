import { useEffect, useState, useCallback } from "react";
import { TAGS as DEFAULT_TAGS } from "../data/tags";

// ============================================================
// SETUP: fill these in once you've created a GitHub repo and
// uploaded public/tags.json to it. See README.md for full steps.
// Until you do, the site just uses the DEFAULT_TAGS above, so
// nothing breaks — this is purely additive.
// ============================================================
export const GH_OWNER = "gurditsingh09bedi";
export const GH_REPO = "nexaura-3d-showcase";
export const GH_BRANCH = "main";
export const DATA_PATH = "tags.json";

const API_URL = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${DATA_PATH}`;
const JSDELIVR_URL = `https://cdn.jsdelivr.net/gh/${GH_OWNER}/${GH_REPO}@${GH_BRANCH}/${DATA_PATH}`;
const RAW_URL = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/${DATA_PATH}`;

export function isBackendConfigured() {
  return GH_OWNER !== "PASTE_YOUR_GITHUB_USERNAME" && GH_REPO !== "PASTE_YOUR_REPO_NAME";
}

export function useTags() {
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("default"); // "default" | "github"

  const load = useCallback(async () => {
    if (!isBackendConfigured()) {
      setTags(DEFAULT_TAGS);
      setSource("default");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // GitHub's own API first — never cached by a CDN, so a fresh commit
      // shows up immediately instead of waiting on CDN cache to expire.
      let data = null;
      try {
        const res = await fetch(`${API_URL}?t=${Date.now()}`, {
          headers: { Accept: "application/vnd.github.raw" },
          cache: "no-store",
        });
        if (res.ok) data = await res.json();
      } catch (e) {}
      if (!data) {
        try {
          const res = await fetch(`${JSDELIVR_URL}?t=${Date.now()}`, { cache: "no-store" });
          if (res.ok) data = await res.json();
        } catch (e) {}
      }
      if (!data) {
        const res = await fetch(`${RAW_URL}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) data = await res.json();
      }
      if (data?.tags?.length) {
        setTags(data.tags);
        setSource("github");
      } else {
        setTags(DEFAULT_TAGS);
        setSource("default");
      }
    } catch (e) {
      setTags(DEFAULT_TAGS);
      setSource("default");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [load]);

  return { tags, loading, source, reload: load };
}

// ---- write side: used by the Admin panel to commit changes ----
export async function saveTagsToGitHub(tags, token, attempt = 1) {
  const getRes = await fetch(`${API_URL}?t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!getRes.ok) throw new Error("Couldn't read the current tags.json — check the repo/token setup.");
  const getData = await getRes.json();
  const sha = getData.sha;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify({ tags }, null, 2))));
  const putRes = await fetch(API_URL, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Update tags (${tags.length} total)`, content, sha, branch: GH_BRANCH }),
  });
  if (putRes.status === 409 && attempt < 4) {
    await new Promise((r) => setTimeout(r, 500 * attempt));
    return saveTagsToGitHub(tags, token, attempt + 1);
  }
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(err.message || "GitHub rejected the commit.");
  }
}

export async function verifyToken(token) {
  const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.ok;
}
