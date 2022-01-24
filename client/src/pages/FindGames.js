import {Container, Row, Alert} from "react-bootstrap";
import IDInput from "../components/IDInput";
import {useEffect, useState} from "react";
import axios from 'axios';
import CategoriesSelect from "../components/CategoriesSelect";
import FriendsSelect from "../components/FriendsSelect";
import ButtonMenu from "../components/ButtonMenu";

function FindGames(props) {

    // const [friends, setFriends] = useState([])
    // const [allFriends, setAllFriends] = useState([])

    const [friends, setFriends] = useState([])
    const [selectedFriends, setSelectedFriends] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [listKey, setKey] = useState(null)
    const [alerts, setAlerts] = useState(null)

    const sectionStyle = {
        marginTop: "8vh"
    }

    useEffect(() =>{
        setAlerts(null)
        setFriends(formatFriends(props.friends))

    }, [props.friends])

    function formatFriends(friends){
        friends.sort((a,b) => {
            if(a['name'] < b['name']){ return -1 }
            if(a['name'] > b['name']){ return 1 }
            return 0
        })
        friends.forEach(currentFriend => {
            currentFriend.label = <div><b>{currentFriend['name']}</b> <img src={currentFriend['icon']} alt="Icon cannot be displayed"/></div>
        })
        return friends
    }

    function findSharedGames(id, selectFriends, selectCategories) {
        let friendIDs = []
        selectFriends.forEach(friend => {
            friendIDs.push(friend['value'])
        })
        friendIDs.push(id)
        let categoryIDs = []
        selectCategories.forEach(category => {
            categoryIDs.push(category['value'])
        })
        if(friendIDs.length > 0) {
            let url = "/api/steam/shared_multiplayer_games/" + friendIDs.join(",") + "/" + categoryIDs.join(",")
            axios.get(url).then(response => {
                setKey(response.data.key)
            }).catch(error => {
                if(error.response.status == 404){
                    const names =  error.response.data.privateSteamIDs.map(id => {
                        for(let i = 0; i < selectFriends.length; i++){
                            if(selectFriends[i].value == id){
                                return selectFriends[i].name
                            }
                        }
                    }).join(", ")
                    setAlerts(<Alert variant="danger">{"The following users are private or have their games hidden: " + names}</Alert>)
                }
            })
        }
    }


    return (
        <div className="FindGames">
            <Container>
                <Row style={sectionStyle}>
                    <FriendsSelect friends={selectedFriends} allFriends={friends} setFriends={setSelectedFriends}/>
                </Row>
                <Row style={sectionStyle}>
                    <CategoriesSelect selectedCategories = {selectedCategories} setSelectedCategories= {setSelectedCategories}/>
                </Row >
                
                <ButtonMenu findSharedGames={() => findSharedGames(props.account.id, selectedFriends, selectedCategories)} listKey={listKey} friends={friends} selectedCategories={selectedCategories}/>
                {alerts}
            </Container>
        </div>
    );
}

export default FindGames;
