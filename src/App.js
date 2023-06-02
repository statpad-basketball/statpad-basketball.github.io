import {BrowserRouter, Route, Routes} from 'react-router-dom'

//pages & components
import Navbar from './components/Navbar/Navbar'
import LandingPage from './components/LandingPage/LandingPage';
import Projects from './components/Projects/Projects';
import SubNavbar from './components/Navbar/SubNavbar';
import Articles from './components/Articles/Articles';
import About from './components/About/About';
import Rankings from './components/Projects/Rankings';
import Methodology from './components/Projects/Methodology';
import ExampleArticle from './components/Articles/ExampleArticle';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<><Navbar/><LandingPage/></>}
                        />
                        <Route
                            path="/projects"
                            element={<><SubNavbar/><Projects/></>}
                        />
                        <Route
                            path="/articles"
                            element={<><SubNavbar/><Articles/></>}
                        />
                        <Route
                            path="/about"
                            element={<><SubNavbar/><About/></>}
                        />
                        <Route
                            path="/rankings"
                            element={<><SubNavbar/><Rankings/></>}
                        />
                        <Route
                            path="/methods"
                            element={<><SubNavbar/><Methodology/></>}
                        />
                        <Route
                            path="/example-article"
                            element={<><SubNavbar/><ExampleArticle/></>}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
