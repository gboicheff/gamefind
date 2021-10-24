import React, { useEffect, useState } from 'react';
import Game from "./Game";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import {Container, Row} from "react-bootstrap";


function GamesList(props) {
    const [fetchedGames, setFetchedGames] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const numGamesToFetch = 3

    useEffect(() => {
        const fetchDataE = async () => {
            await fetchData()
        }
        fetchDataE()        
    }, [props.appIDs])

    useEffect(() => {
        if(props.appIDs.length <= fetchedGames.length){
            setHasMore(false)
        } else
        {
            setHasMore(true)
        }
    }, [fetchedGames])

    const fetchData = () => {
        const body = {
            appIDs: props.appIDs.slice(fetchedGames.length, fetchedGames.length+numGamesToFetch)
        }
        return axios.post("/api/steam/gamesinfo", body).then(response => {
            setFetchedGames(fetchedGames.concat(response.data.body.games))
        }).catch(error => {console.log(error)})
        
    };

    return (
        <InfiniteScroll
          dataLength={fetchedGames.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
        <Container>
        {
            fetchedGames.map((game,index) => {
                return <Row><Game name={game.name} icon={game.thumbnailLink} categories={game.categories} key={index} appID={game.appId}/></Row>
            })
        } 
        </Container>  
        </InfiniteScroll>
    )
}
export default GamesList;