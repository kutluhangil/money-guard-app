import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

// Sayfaların Lazy Load ile yüklenmesi (Performans için)
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab/StatisticsTab"));
const CurrencyTab = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Loader />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Dashboard routes moved to top-level so nav paths are /home, /statistics, /currency */}
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Dashboard top-level layout: wrap home/statistics/currency with PrivateRoute */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            {/* Default to /home */}
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />

            {/* Sadece Mobil için */}
            <Route path="currency" element={<CurrencyTab />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
