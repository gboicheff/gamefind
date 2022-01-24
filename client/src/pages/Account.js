import {Container, Row, Col, Image, Button} from "react-bootstrap";



function Account(props) {
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
                    <Row className="fixed-bottom" style={{marginBottom: "2vh"}}>
                        <Col>
                            <Button variant="danger" href="/steam/logout">Logout</Button>
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
