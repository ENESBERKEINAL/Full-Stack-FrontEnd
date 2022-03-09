import { ClassNames } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>({
    container:{
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cfe8fc",
        height: '100vh'
    }
}))

function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);  
    const classes = useStyles();
    useEffect(()=>{
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error){
        return <div> Error !!!</div>
    }else if(!isLoaded){
        return <div> Loading...</div>
    }else{
        return(
            <Container fixed className={classes.container}>



            {postList.map(post => (
                <Post userId={post.userId} userName={post.userName} title= {post.title} text={post.text}></Post>
                
            ))}
            </Container>

        );
    }




}

export default Home;