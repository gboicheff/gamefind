import {Container, Row, Col, Image, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from 'axios';

function Account(props) {
    const [lists, setLists] = useState([])
    useEffect(() =>{
        if(props.account){
            axios.get("/api/steam/game-lists/" + props.account.id.toString()).then(response => {
                setLists(response.data.lists)
            }).catch(error => {
                console.log(error)
            })
        }
        console.log(lists)
    }, [props.account])
    
    // function formatLists(lists){
    //     console.log(lists)
    //     return lists.map(list => {
    //         <a href={"www.gamefind.io/game-list/" + list.key}>{"www.gamefind.io/game-list/" + list.key}</a>
    //     })
    // }

    return (
        <div className="SteamAuth">
            {
                props.account ? 
                <Container>            
                    <Row>
                        <Col>
                            <Image src={props.account.photos[2].value} fluid roundedCircle/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "2vh"}}>
                        <Col>
                            <h1>{props.account.displayName}</h1>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "2vh"}}>
                        <Col>
                            <h3>List history:</h3>
                        </Col>
                    </Row>
                    {
                        lists.map(list => {
                            <Row><a href={"www.gamefind.io/game-list/" + list.key}>{"www.gamefind.io/game-list/" + list.key}</a></Row>
                        })
                    }
                </Container>
                :
                "Login to view your account"
            }
        </div>
    );
}

export default Account;
