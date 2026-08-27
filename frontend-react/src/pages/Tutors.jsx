import { useState, useEffect } from "react";
import { api } from "../services/api";
import ReputationBadge from "../components/ReputationBadge";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/tutors/top")
      .then(setTutors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20 text-slate-500">Chargement...</p>;

  const medailles = { 1: "🥇", 2: "🥈", 3: "🥉" };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Nos meilleurs tuteurs</h1>
      <p className="mt-2 text-slate-600">
        Classement établi par moyenne bayésienne : un tuteur avec un seul avis à 5 étoiles
        ne devance pas un tuteur avec cinquante avis à 4,8.
      </p>

      {tutors.length === 0 ? (
        <p className="mt-8 text-slate-500">Pas encore assez d'avis pour établir un classement.</p>
      ) : (
        <div className="mt-8 grid gap-3">
          {tutors.map(t => (
            <div key={t.tutor_id}
                 className="bg-white rounded-2xl shadow border border-slate-100 p-5 flex items-center gap-4">
              <div className="w-10 text-center text-2xl">
                {medailles[t.rank] || <span className="text-slate-400 text-lg">{t.rank}</span>}
              </div>

              <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                {t.first_name[0]}{t.last_name[0]}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-slate-900">{t.first_name} {t.last_name}</p>
                <ReputationBadge average={t.averageStars} count={t.totalRatings} />
              </div>

              <div className="text-center" title="Score bayésien">
                <p className="text-lg font-bold text-slate-400">{t.bayesianScore}</p>
                <p className="text-xs text-slate-400">score</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
