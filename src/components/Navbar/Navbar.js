import React from "react";
import "./Navbar.scss";
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { textAlign } from "@mui/system";


function Navbar(){
    let userId=5;
    return(
        <div>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left"}}>
          <Link className="link_home" to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div">
          <Link className="link_users" to={{pathname: 'users/' + userId}}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

        </div>
    )
}

export default Navbar;