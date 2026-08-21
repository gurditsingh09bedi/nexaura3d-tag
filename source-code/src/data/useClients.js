import { useEffect, useState, useCallback } from "react";
import { CLIENTS as DEFAULT_CLIENTS } from "./clients";
import { GH_OWNER, GH_REPO, GH_BRANCH } from "./useTags";

const DATA_PATH = "clients.json";
const API_URL = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${DATA_PATH}`;
const JSDELIVR_URL = `https://cdn.jsdelivr.net/gh/${GH_OWNER}/${GH_REPO}@${GH_BRANCH}/${DATA_PATH}`;
const RAW_URL = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/${DATA_PATH}`;

export function useClients() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
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
        try {
          const res = await fetch(`${RAW_URL}?t=${Date.now()}`, { cache: "no-store" });
          if (res.ok) data = await res.json();
        } catch (e) {}
      }
      if (data?.clients?.length) setClients(data.clients);
      else setClients(DEFAULT_CLIENTS);
    } catch (e) {
      setClients(DEFAULT_CLIENTS);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [load]);

  return { clients, loading, reload: load };
}

export async function saveClientsToGitHub(clients, token, attempt = 1) {
  const getRes = await fetch(`${API_URL}?t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!getRes.ok) throw new Error("Couldn't read the current clients.json — check the repo/token setup.");
  const getData = await getRes.json();
  const sha = getData.sha;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify({ clients }, null, 2))));
  const putRes = await fetch(API_URL, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Update clients (${clients.length} total)`, content, sha, branch: GH_BRANCH }),
  });
  if (putRes.status === 409 && attempt < 4) {
    await new Promise((r) => setTimeout(r, 500 * attempt));
    return saveClientsToGitHub(clients, token, attempt + 1);
  }
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    throw new Error(err.message || "GitHub rejected the commit.");
  }
}
