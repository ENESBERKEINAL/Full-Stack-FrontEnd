import React,{useState, useEffect,useRef} from "react";  
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { bgcolor } from "@mui/system";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 800,
      textAlign : "left",
      margin : 20
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : 'white !important',
        bgcolor:"red"
    }
  }));
  

function Post(props){
    const {userId,userName,title,text,postId,likes} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [commentList,setCommentList] = useState([]);  
    const isInitialMount = useRef(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount,setLikeCount] = useState(likes.length || 0);
    const [likeId,setLikeId] = useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList)
      };
    const handleLike =() => {
      setIsLiked(!isLiked);
      if(!isLiked){
        saveLike();
        setLikeCount(likeCount+1);
      }

      else{
        deleteLike();
        setLikeCount(likeCount -1);
      }
    }

    const refreshComments = () => {
      fetch("/comment?postId="+postId)
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setCommentList(result);
          },
          (error) => {
              setIsLoaded(true);
              setError(error);
          }
      )
  }

  const checkLikes = () => {
    var likeControl = likes.find((like=> like.userId === userId));
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }

  }

  const saveLike = () =>{
    fetch("/likes",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId:postId,
        userId:userId,
      }),
    })
    .then((res)=> res.json())
    .catch((err) => console.log(err))
  }  
  const deleteLike = () =>{
    fetch("/likes/"+likeId,{
      method: "DELETE",
    })
    .catch((err) => console.log(err))
  }  

  useEffect(()=>{
    if(isInitialMount.current)
      isInitialMount.current= false;
    else
      refreshComments;
}, [commentList])

  useEffect(() => {checkLikes()},
   []) 
      
    return (
        <div className="postContainer">
        <Card sx={{ width: 800 }} className={classes.root}>
      <CardHeader style={{textAlign:"left"}} 
        avatar={
          
          // <a href={"/users/${userId}"}>
          <Link className={classes.link} to={{pathname: '/users/' + userId}}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" className={classes.avatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          // </a>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon style={isLiked? {color:"red"}:null} />
        </IconButton>

        {likeCount}
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className = {classes.container}>
        {error? "error" :
        isLoaded? commentList.map(comment => (
          <Comment userId = {1} userName = {"asdasdasd"} text = {comment.text}></Comment>
        )) : "Loading"}
        <CommentForm userId = {1} userName = {"asdasdasd"} postId = {postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>
        </div>
    )

}

export default Post;