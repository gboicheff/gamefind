import './App.css';

import { BrowserRouter, Redirect, Route} from 'react-router-dom';
import FindGames from "./pages/FindGames.js";
import DisplayGames from "./pages/DisplayGames.js";
import NavBar from "./components/NavBar.js"
import FAQ from "./pages/FAQ.js"
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <Route path="/" exact>
                    <Redirect to="/find-games"/>
                </Route>
                <Route path="/find-games">
                    <FindGames/>
                </Route>
                <Route path="/faq">
                    <FAQ/>
                </Route>
                <Route path="/game-list/:key">
                    <DisplayGames/>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
