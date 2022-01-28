import {useEffect, useState} from "react";
import axios from 'axios';
import GamesList from "../components/GamesList";
import {useParams} from "react-router-dom";
import NoListMsg from "../components/NoListMsg";
import {Container, Row, Col, Image} from "react-bootstrap";
import {categories} from "../data/Categories"

function FindGames() {
    const [appIDs, setAppIDs] = useState([])
    const [userIDs, setUserIDs] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const {key} = useParams()

    useEffect(() => {
        const url = "/api/steam/game-list/" + key
        axios.get(url).then(response => {
            setAppIDs(response.data.body.appIDs)
            setUserIDs(response.data.body.userIDs)
            setSelectedCategories(response.data.body.categories)
        }).catch(error => {
            console.log(error)
        })
    }, [])


    useEffect(() => {
        const url = "/api/steam/playerinfo/"
        const body = {
            userIDs: userIDs
        }
        axios.post(url, body).then(res => {
            setUserInfo(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [userIDs])

    return (
        <div className="DisplayGames">
            <Container>
                <Row className="justify-content-center" style={{marginTop: "10vh"}}>
                    <h2><b>Games Owned by:</b></h2>
                </Row>
                 <Row className="justify-content-center">
                    {userInfo.map(info => {
                        return <Col><Image src={info.fullIcon} roundedCircle fluid></Image><h5>{info.name}</h5></Col>
                    })}
                </Row>
                <Row className="justify-content-center" style={{marginTop: "10vh"}}>
                    <h2><b>Selected Categories:</b></h2>
                </Row>
                <Row className="justify-content-center" style={{marginBottom: "10vh"}}>
                    <h4>{selectedCategories.map(category => categories[category]).join(", ")}</h4>
                </Row>
                {appIDs.length > 0 ? <GamesList appIDs={appIDs} userIDs={userIDs}/> : <NoListMsg/>}
            </Container>
        </div>
    );
}

export default FindGames;
