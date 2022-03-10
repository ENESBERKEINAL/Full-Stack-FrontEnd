import React,{useState, useEffect} from "react";  
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { bgcolor } from "@mui/system";
import { Button, InputAdornment } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  

function PostForm(props){
    const {userId,userName,refreshPosts} = props;
    const classes = useStyles();
    const [text,setText] = useState("");
    const [title,setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                text: text,
                userId: userId,
            }),
        })
        .then((res) => res.json())
        //TODO allways droping error fix that
        .then((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();

      };
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
      };
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
      };
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setIsSent(false);
    };

    return (
        <div>
        <Snackbar open={isSent} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} position="center">
          Post published successfully!!!
        </Alert>
      </Snackbar>

      <div className="postContainer">
        <Card sx={{ width: 800 }} className={classes.root}>
      <CardHeader style={{textAlign:"left"}} 
        avatar={
          <Link className={classes.link} to={{pathname: '/users/' + userId}}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" className={classes.avatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title= {<OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Title"
            inputProps={{maxlength: 25}}
            fullWidth
            value = {title} 
            onChange={ (i) => handleTitle( i.target.value)}
            >
            
        
        </OutlinedInput>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="left">
        {
        <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Text"
            inputProps={{maxlength: 250}}
            fullWidth
            value = {text} 
            onChange={ (i) => handleText( i.target.value)}
            endAdornment={
                <InputAdornment position="end">

                <Button variant="contained"style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white'}}
                onClick={handleSubmit}
                >Post</Button>
                </InputAdornment>
            }>
            
        </OutlinedInput>
        }
        </Typography>
      </CardContent>
      
    </Card>
        </div>
      
      </div>
        
    )

}

export default PostForm;