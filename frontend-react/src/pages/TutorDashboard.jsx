import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import PendingCard from "../components/PendingCard";
import TutorRequestCard from "../components/TutorRequestCard";
import ReputationBadge from "../components/ReputationBadge";

export default function TutorDashboard() {
  const [pending, setPending] = useState([]);
  const [mine, setMine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState("");
  const { user } = useAuth();

  async function loadAll() {
    try {
      const [p, m] = await Promise.all([
        api("/requests/pending"),
        api("/requests/tutor/my")
      ]);
      setPending(p);
      setMine(m);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleAccept(id) {
    setActionError("");
    try {
      await api(`/requests/${id}/accept`, { method: "PATCH" });
      setLoading(true);
      await loadAll();
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleRespond(id, response) {
    setActionError("");
    try {
      await api(`/requests/${id}/respond`, {
        method: "PATCH",
        body: JSON.stringify({ tutorResponse: response })
      });
      setLoading(true);
      await loadAll();
    } catch (err) {
      setActionError(err.message);
    }
  }

  const accepted = mine.filter((r) => r.status === "ACCEPTED");
  const completed = mine.filter((r) => r.status === "COMPLETED");

  if (loading) return <p className="text-center py-20 text-slate-500">Chargement...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Espace tuteur</h1>
      <p className="mt-2 text-slate-600 mb-10">Aide les étudiants et suis tes réponses.</p>

      {actionError && <p className="text-red-600 mb-6">{actionError}</p>}

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Demandes en attente</h2>
        {pending.length === 0 ? (
          <p className="text-slate-400 italic">Aucune demande en attente pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {pending.map((r) => (
              <PendingCard key={r.id} request={r} onAccept={handleAccept} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Mes demandes acceptées</h2>
        {accepted.length === 0 ? (
          <p className="text-slate-400 italic">Aucune demande acceptée en cours.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {accepted.map((r) => (
              <TutorRequestCard key={r.id} request={r} onRespond={handleRespond} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Demandes terminées</h2>
        {completed.length === 0 ? (
          <p className="text-slate-400 italic">Pas encore de demande terminée.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {completed.map((r) => (
              <TutorRequestCard key={r.id} request={r} onRespond={handleRespond} />
            ))}
          </div>
        )}
        <ReputationBadge tutorId={user.id} />
      </section>
    </div>
  );
}
