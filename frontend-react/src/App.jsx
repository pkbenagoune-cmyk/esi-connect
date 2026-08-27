import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";

// Nouvelles pages de messagerie
import Conversations from "./pages/Conversations";
import Conversation from "./pages/Conversation";
import Tutors from "./pages/Tutors";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutors" element={<Tutors />} />

          {/* Dashboard étudiant */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dashboard tuteur */}
          <Route
            path="/tutor"
            element={
              <ProtectedRoute role="TUTOR">
                <TutorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Liste des conversations */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            }
          />

          {/* Conversation d'une demande précise */}
          <Route
            path="/messages/:requestId"
            element={
              <ProtectedRoute>
                <Conversation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}