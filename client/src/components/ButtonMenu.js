import {Button, Row, Col} from "react-bootstrap";

function ButtonMenu(props) {
    const sectionStyle = {
        marginTop: "12vh",
    }
    const findGameButton = <Row style={sectionStyle}><Col xs={12}><Button style={{width: "100%"}} disabled={props.selectedFriends.length === 0 && props.selectedCategories.length === 0} onClick={props.findSharedGames} variant="primary"><h3>{"Find games"}</h3></Button></Col></Row>
    const getRefListButtons = !props.listKey ?  null : (
                            <Row style={sectionStyle}>
                                <Col xs={7} md={8}>
                                    <Button href={"/game-list/" + props.listKey.toString()} target="_blank" variant="primary" style={{width: "100%"}}><h3>Get List</h3></Button>
                                </Col>
                                <Col xs={5} md={4}>
                                    <Button href="/find-games" variant="danger" style={{width: "100%"}}><h3>Restart</h3></Button>
                                </Col>
                            </Row>)
    return (
        getRefListButtons ?? findGameButton
    )
}
export default ButtonMenu;