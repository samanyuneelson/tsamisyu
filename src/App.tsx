import "./App.css";
import {
  LandingPage,
  PageNotFound,
  TrackerPage,
  NotesPage,
  PlayGroundPage,
  DashboardPage,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <LandingPage />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/playground" element={<PlayGroundPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
