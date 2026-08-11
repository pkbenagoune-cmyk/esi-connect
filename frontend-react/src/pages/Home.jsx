import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import SubjectCard from "../components/SubjectCard";
import AnswerCard from "../components/AnswerCard";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let annule = false;

    async function charger() {
      try {
        const [s, st, a] = await Promise.all([
          api("/subjects"),
          api("/requests/stats/public"),
          api("/requests/completed/public")
        ]);

        if (!annule) { setSubjects(s); setStats(st); setAnswers(a); }
      } catch (err) {
        if (!annule) setError(err.message);
      } finally {
        if (!annule) setLoading(false);
      }
    }

    charger();
    return () => { annule = true; };
  }, []);

  if (loading) return <p className="text-center py-20 text-slate-500">Chargement...</p>;
  if (error) return <p className="text-center py-20 text-red-600">API injoignable : {error}</p>;

  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Get help. Give help. <span className="text-blue-600">Grow together.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              ESI-Connect est une plateforme de tutorat et d'entraide entre étudiants.
              Besoin d'aide sur une matière ? Crée une demande. Envie d'aider les autres ?
              Accepte une demande et commence à tutorer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition">
                Commencer
              </Link>
              <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition">
                Devenir tuteur
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-sm w-full">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats?.totalRequests ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">Demandes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats?.completedRequests ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">Terminées</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats?.totalTutors ?? 0}</p>
                  <p className="text-xs text-slate-500 mt-1">Tuteurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Matières</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Parcours les matières disponibles pour le tutorat entre pairs sur ESI-Connect.
            </p>
          </div>

          {subjects.length === 0 ? (
            <p className="text-center text-slate-400 italic">Aucune matière disponible pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PUBLIC ANSWERS WALL */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Dernières réponses</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Un aperçu des demandes récemment résolues par nos tuteurs.
            </p>
          </div>

          {answers.length === 0 ? (
            <p className="text-center text-slate-400 italic">Aucune réponse publique pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {answers.map((answer) => (
                <AnswerCard key={answer.id} answer={answer} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
