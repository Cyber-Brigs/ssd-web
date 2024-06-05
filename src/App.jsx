import React from "react";
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

// User Components
import UserSidebar from "./components/users/UserSidebar.jsx";
import UploadSrs from "./components/texts/UploadSrs.jsx";
import UserDashboard from "./components/users/UserDashboard.jsx";
import TextPreProcessing from "./components/texts/TextPreProcessing.jsx";
import ResultsViewPage from "./components/texts/ResultsViewPage.jsx";
import SimilarityResultsPage from "./components/texts/SimilarityResultsPage.jsx";

const App = () => {
  return (
    <div className="App">
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
    </div>
  );
};

export default App;
