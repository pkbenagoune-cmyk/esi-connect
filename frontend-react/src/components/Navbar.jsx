import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { socket } from "../services/socket";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [nonLus, setNonLus] = useState(0);

  const dashboardPath = user?.role === "STUDENT" ? "/student" : "/tutor";

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Écoute des notifications de nouveaux messages, où que l'utilisateur se trouve
  useEffect(() => {
    if (!user) return;

    function onUnreadNotification() {
      setNonLus(prev => prev + 1);
    }

    socket.on("unread-notification", onUnreadNotification);

    return () => {
      socket.off("unread-notification", onUnreadNotification);
    };
  }, [user]);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          ESI-Connect
        </Link>

        <ul className="flex items-center gap-6 text-slate-600 font-medium">
          {user ? (
            <>
              <li>
                <Link to={dashboardPath} className="hover:text-blue-600 transition">
                  Mon espace
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="relative hover:text-blue-600 transition"
                  onClick={() => setNonLus(0)}
                >
                  Messages
                  {nonLus > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {nonLus}
                    </span>
                  )}
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-slate-900">{user.first_name}</span>
                <span className="inline-block rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
                  {user.role}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-blue-600 transition">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition">
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}