import React, { useState } from "react";
import Content from './ResourceContent';
import "./Resources.css";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/system';

export default function Resource(props) {
    
    const [resources, setResource] = useState(["activities", "boba", "books", "classes", "clubs", "food", "majors", "play", "trival", "house", "apartment", "home"]);
    const [name, setName] = useState();
    function handle (name) {
        const element = document.getElementById(name);
        element.style.scrollMarginTop = "80px";
        element.scrollIntoView( { behavior: 'smooth' } );
    }
    const DrawerNav = styled(Drawer)({
        position: "fixed",
      })


    const drawer = (
        <div className="drawer">          
          <List>
              {['activities', 'boba', 'books', 'classes', 'clubs', 'food', 'majors', 'play', 'trival', 'house', 'apartment', 'home', 'home', 'home', 'home', 'home', 'home', 'home'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={()=> {
                      handle(text);
                  }} >
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </div>
      );

    return <>
            <div id="main">
                    <DrawerNav
                        variant="permanent"
                    >
                        {drawer}
                    </DrawerNav>
                    <div className="allContent">
                        {resources.map((resource) => {
                            return (
                                <div id={resource}>
                                    <Content title={resource} />
                                </div>)
                        })}
                    </div>
            </div>
        </>
}