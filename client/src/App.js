import './App.css';

import { BrowserRouter, Redirect, Route} from 'react-router-dom';
import FindGames from "./pages/FindGames.js";
import DisplayGames from "./pages/DisplayGames.js";
import Footer from "./components/Footer.js"
function App() {
    return (
        <div className="App">
            <Footer/>
            <BrowserRouter>
                <Route path="/" exact>
                    <Redirect to="/find-games"/>
                </Route>
                <Route path="/find-games">
                    <FindGames/>
                </Route>
                <Route path="/game-list/:key">
                    <DisplayGames/>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
