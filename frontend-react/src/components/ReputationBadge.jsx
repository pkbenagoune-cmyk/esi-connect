import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function ReputationBadge({ tutorId }) {
  const [reputation, setReputation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const data = await api(`/tutors/${tutorId}/reputation`);
        if (!annule) setReputation(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!annule) setLoading(false);
      }
    }

    charger();
    return () => { annule = true; };
  }, [tutorId]);

  if (loading) {
    return <p className="text-sm text-slate-400">Chargement...</p>;
  }

  if (!reputation || reputation.count === 0) {
    return (
      <p className="text-sm text-slate-500 italic">Pas encore d'avis</p>
    );
  }

  const etoilesPleines = Math.round(parseFloat(reputation.average));

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= etoilesPleines ? "text-yellow-400" : "text-slate-300"}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-800">
        {reputation.average}
      </span>
      <span className="text-sm text-slate-500">
        ({reputation.count} avis)
      </span>
    </div>
  );
}