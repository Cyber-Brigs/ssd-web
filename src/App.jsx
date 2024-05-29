import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./components/styles/styles.css";
// Base component
import LandingPage from "./components/common/LandingPage";
// User Authentication
import SignUp from "./components/common/SignUp";
import LogIn from "./components/common/LogIn";
// Common utility Component
import PageNotFound from "./components/common/PageNotFound";
import RequireAuth from "./components/common/utils/RequireAuth";
import SpinLoading from "./components/common/utils/SpinLoading";

// User Components
import UserSidebar from "./components/users/UserSidebar";
import UploadSrs from "./components/texts/UploadSrs";
import TextPreProcessing from "./components/texts/TextPreProcessing";
import UserDashboard from "./components/users/UserDashboard";
import SimilarityResultsPage from "./components/texts/SimilarityResultsPage";
import ResultsViewPage from "./components/texts/ResultsViewPage.jsx";

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
              <Route path="uploads" element={<Outlet />}>
                <Route index element={<UploadSrs />} />
              </Route>
              <Route path="preprocessing" element={<Outlet />}>
                <Route index element={<TextPreProcessing />} />
              </Route>
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
