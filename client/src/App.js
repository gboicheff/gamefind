import './App.css';

import { BrowserRouter, Redirect, Route} from 'react-router-dom';
import FindGames from "./pages/FindGames.js";
import DisplayGames from "./pages/DisplayGames.js";
import NavBar from "./components/NavBar.js"
import FAQ from "./pages/FAQ.js"
import Account from "./pages/Account.js"
import {useEffect, useState} from "react";
import axios from 'axios';
function App() {
    const [account, setAccount] = useState(null)
    const [friends, setFriends] = useState([])

    useEffect(() =>{
        axios.get('/steam/account').then(res => {
            setAccount(res.data[0].user)
            axios.get('/api/steam/friends/' + res.data[0].user.id).then(res => {
                setFriends(res.data)
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar account={account}/>
                <Route path="/" exact>
                    <Redirect to="/find-games"/>
                </Route>
                <Route path="/find-games">
                    <FindGames account={account} friends={friends}/>
                </Route>
                <Route path="/faq">
                    <FAQ/>
                </Route>
                <Route path="/account">
                    <Account account={account}/>
                </Route>
                <Route path="/game-list/:key">
                    <DisplayGames/>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
