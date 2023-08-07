import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages & components
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Projects from "./components/Projects/Projects";
import SubNavbar from "./components/Navbar/SubNavbar";
import Articles from "./components/Articles/Articles";
import About from "./components/About/About";
import ExampleArticle from "./components/Articles/ExampleArticle";
import Rankings from "./components/Projects/Rankings-Updated";
import Methodology from "./components/Projects/Methodology";
import Visualization from "./components/Projects/Visualization";
import ChampRankings from "./components/Projects/Championship/Champ-Rankings";
import ChampMethodology from "./components/Projects/Championship/Champ-Methodology";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <LandingPage />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <SubNavbar />
                  <Projects />
                </>
              }
            />
            <Route
              path="/articles"
              element={
                <>
                  <SubNavbar />
                  <Articles />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <SubNavbar />
                  <About />
                </>
              }
            />
            <Route
              path="/champ-rankings"
              element={
                <>
                  <SubNavbar />
                  <ChampRankings />
                </>
              }
            />
            <Route
              path="/champ-methods"
              element={
                <>
                  <SubNavbar />
                  <ChampMethodology />
                </>
              }
            />
            <Route
              path="/rankings"
              element={
                <>
                  <SubNavbar />
                  <Rankings />
                </>
              }
            />
            <Route
              path="/methods"
              element={
                <>
                  <SubNavbar />
                  <Methodology />
                </>
              }
            />
            <Route
              path="/example-article"
              element={
                <>
                  <SubNavbar />
                  <ExampleArticle />
                </>
              }
            />
            <Route
              path="/visualization"
              element={
                <>
                  <SubNavbar />
                  <Visualization />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
