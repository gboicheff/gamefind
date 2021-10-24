import {useEffect, useState} from "react";
import axios from 'axios';
import GamesList from "../components/GamesList";
import {useParams} from "react-router-dom";
import NoListMsg from "../components/NoListMsg";
import {Container} from "react-bootstrap";


function FindGames() {
    const [appIDs, setAppIDs] = useState([])
    const [userIDs, setUserIDs] = useState([])
    const {key} = useParams()

    useEffect(() => {
        const url = "/api/steam/game-list/" + key
        axios.get(url).then(response => {
            setAppIDs(response.data.body.appIDs)
            setUserIDs(response.data.body.userIDs)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="DisplayGames">
            <Container>
                {appIDs.length > 0 ? <GamesList appIDs={appIDs} userIDs={userIDs}/> : <NoListMsg/>}
            </Container>
        </div>
    );
}

export default FindGames;
