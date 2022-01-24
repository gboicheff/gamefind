import {Container, Row, Col, Image, Button} from "react-bootstrap";
import {useEffect, useState} from "react";


function Account(props) {
    const [lists, setLists] = useState([])
    useEffect(() =>{

    }, [])
    
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
                            <h3>Your lists:</h3>
                        </Col>
                    </Row>
                </Container>
                :
                "Login to view your account"
            }
        </div>
    );
}

export default Account;
