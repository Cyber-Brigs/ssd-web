import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./components/styles/styles.css";
// Base component
import LandingPage from "./components/common/LandingPage.jsx";
// User Authentication
import SignUp from "./components/common/SignUp.jsx";
import LogIn from "./components/common/LogIn.jsx";
// Common utility Component
import PageNotFound from "./components/common/PageNotFound.jsx";
import RequireAuth from "./components/common/utils/RequireAuth.jsx";
import SpinLoading from "./components/common/utils/SpinLoading.jsx";

// User Components
import UserSidebar from "./components/users/UserSidebar.jsx";
import UploadSrs from "./components/texts/UploadSrs.jsx";
import UserDashboard from "./components/users/UserDashboard.jsx";
const TextPreProcessing = lazy(
  () => import("./components/texts/TextPreProcessing.jsx")
);
const SimilarityResultsPage = lazy(
  () => import("./components/texts/SimilarityResultsPage.jsx")
);
const ResultsViewPage = lazy(
  () => import("./components/texts/ResultsViewPage.jsx")
);
const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<SpinLoading />}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          {/* COMMON ROUTES */}
          <Route index element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          {/* USER ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="user" element={<UserSidebar />}>
              <Route index element={<UserDashboard />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="uploads" element={<UploadSrs />} />
              <Route path="preprocessing" element={<TextPreProcessing />} />
              <Route path="lda-analysis" element={<Outlet />}>
                <Route index element={<SimilarityResultsPage />} />
                <Route
                  path="results"
                  element={<ResultsViewPage page={"lda"} />}
                />
              </Route>
              <Route path="lsa-analysis" element={<Outlet />}>
                <Route index element={<SimilarityResultsPage />} />
                <Route
                  path="results"
                  element={<ResultsViewPage page={"lsa"} />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
