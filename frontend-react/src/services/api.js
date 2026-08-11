const API_URL = "http://localhost:5000/api";

export async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json" };

  // ⚠️ LA SEULE MODIFICATION : on lit le token dans le localStorage à chaque appel,
  // au lieu d'une variable globale du module.
  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API_URL + path, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur inconnue");
  }

  return data;
}
