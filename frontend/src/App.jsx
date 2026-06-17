import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage
from "./pages/LoginPage";

import DashboardPage
from "./pages/DashboardPage";

import TicketsPage
from "./pages/TicketsPage";

import TicketFormPage
from "./pages/TicketsFormPage";

import ProtectedRoute
from "./component/ProtectedRoute";

import Layout
from "./component/Layout";

export default function App() {

  const token =
    localStorage.getItem(
      "token"
    );

  return (

    <BrowserRouter>

      <Routes>

        {/* DEFAULT ROUTE */}

        <Route
          path="/"
          element={

            token

              ? <Navigate to="/dashboard" />

              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Layout>

                <DashboardPage />

              </Layout>

            </ProtectedRoute>
          }
        />

        {/* TICKETS */}

        <Route
          path="/tickets"
          element={

            <ProtectedRoute>

              <Layout>

                <TicketsPage />

              </Layout>

            </ProtectedRoute>
          }
        />

        {/* FORM */}

        <Route
          path="/ticket-form"
          element={

            <ProtectedRoute>

              <Layout>

                <TicketFormPage />

              </Layout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}