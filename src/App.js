import {BrowserRouter, Route, Routes} from 'react-router-dom'

//pages & components
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import Projects from './components/Projects';
import SubNavbar from './components/SubNavbar';
import Articles from './components/Articles';
import About from './components/About';
import Rankings from './components/Rankings';
import Methodology from './components/Methodology';
import ExampleArticle from './components/ExampleArticle';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <h1> Hi </h1>
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
