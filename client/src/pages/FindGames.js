import {Container, Row} from "react-bootstrap";
import IDInput from "../components/IDInput";
import {useState} from "react";
import axios from 'axios';
import CategoriesSelect from "../components/CategoriesSelect";
import FriendsSelect from "../components/FriendsSelect";
import ButtonMenu from "../components/ButtonMenu";

function FindGames() {

    const [friends, setFriends] = useState([])
    const [allFriends, setAllFriends] = useState([])

    const [selectedCategories, setSelectedCategories] = useState([])

    const [steamID, setSteamID] = useState(0)

    const [listKey, setKey] = useState(null)

    const sectionStyle = {
        marginTop: "8vh"
    }

    function submitSteamID(newSteamID){
        if(newSteamID > 0) {
            axios.get('/api/steam/friends/' + newSteamID).then(response => {
                let newFriends = response.data
                newFriends.sort((a,b) => {
                    if(a['name'] < b['name']){ return -1 }
                    if(a['name'] > b['name']){ return 1 }
                    return 0
                })
                newFriends.forEach(currentFriend => {
                    currentFriend.label = <div><b>{currentFriend['name']}</b> <img src={currentFriend['icon']} alt="Icon cannot be displayed"/></div>
                })
                setAllFriends(newFriends)
            }).catch(error => console.log(error))
        }
        setSteamID(newSteamID)
    }

    function findSharedGames(id, selectFriends, selectCategories) {
        let friendIDs = []
        selectFriends.forEach(friend => {
            friendIDs.push(friend['value'])
        })
        friendIDs.push(id)
        console.log(friendIDs)
        let categoryIDs = []
        selectCategories.forEach(category => {
            categoryIDs.push(category['value'])
        })
        if(friendIDs.length > 0) {
            let url = "/api/steam/shared_multiplayer_games/" + friendIDs.join(",") + "/" + categoryIDs.join(",")
            axios.get(url).then(response => {
                setKey(response.data.key)
            }).catch(error => {
                console.log(error)
            })
        }
    }


    return (
        <div className="FindGames">
            <Container>
                <Row style={sectionStyle}>
                    <IDInput buttonFunc = {submitSteamID}/>
                </Row>
                <Row style={sectionStyle}>
                    <FriendsSelect friends={friends} allFriends={allFriends} setFriends={setFriends}/>
                </Row>
                <Row style={sectionStyle}>
                    <CategoriesSelect selectedCategories = {selectedCategories} setSelectedCategories= {setSelectedCategories}/>
                </Row >
                
                <ButtonMenu findSharedGames={() => findSharedGames(steamID, friends, selectedCategories)} listKey={listKey} friends={friends} selectedCategories={selectedCategories}/>
            </Container>
        </div>
    );
}

export default FindGames;
