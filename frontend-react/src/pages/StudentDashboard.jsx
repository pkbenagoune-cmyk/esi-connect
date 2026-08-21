import { useState, useEffect } from "react";
import { api } from "../services/api";
import MyRequestCard from "../components/MyRequestCard";

export default function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadRequests() {
    try {
      const data = await api("/requests/my");
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        const [s] = await Promise.all([api("/subjects")]);
        setSubjects(s);
      } catch (err) {
        setError(err.message);
      }
      await loadRequests();
    }
    init();
  }, []);

  function resetForm() {
    setTitle("");
    setSubjectId("");
    setDifficulty("");
    setDescription("");
    setFormError("");
  }

  async function handleCreate(event) {
    event.preventDefault();
    setFormError("");

    if (!title.trim() || !subjectId || !difficulty || !description.trim()) {
      setFormError("Tous les champs sont obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      await api("/requests", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          subjectId,
          difficulty,
          description: description.trim()
        })
      });

      resetForm();
      setShowModal(false);
      setLoading(true);
      await loadRequests();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mes demandes</h1>
          <p className="mt-2 text-slate-600">Suis l'avancement de tes demandes d'aide.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Nouvelle demande
        </button>
      </div>

      {loading && <p className="text-slate-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        requests.length === 0 ? (
          <p className="text-slate-400 italic">Tu n'as pas encore créé de demande.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {requests.map((request) => (
              <MyRequestCard key={request.id} request={request} onRate={loadRequests} />
            ))}
          </div>
        )
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">Créer une demande</h2>
            <p className="text-slate-500 mb-6">Remplis les informations ci-dessous.</p>

            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Exemple : Besoin d'aide sur la récursivité"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Matière</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Choisir une matière</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Difficulté</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Choisir une difficulté</option>
                  <option value="Beginner">Débutant</option>
                  <option value="Intermediate">Intermédiaire</option>
                  <option value="Advanced">Avancé</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Décris ton problème..."
                />
              </div>

              {formError && <p className="text-red-600 mb-4">{formError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? "Envoi..." : "Envoyer la demande"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
