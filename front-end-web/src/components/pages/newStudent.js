import React, { useState, useEffect } from "react";
import ViewCard from './ViewCard';
import "./ViewCard.css";
import Article from "./Article";
import "./Article.css";
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
import "./newStudent.css";


export default function Student(props) {

    const [cards, setCards] = useState([]);
    const [view, setView] = useState(false);
    const [article, setArticle] = useState({});

    const handle = (text) => {
        fetch('https://uwise-back-end.herokuapp.com/newStudent?resource=' + text)
          .then(response => response.json())
          .then(data => {
            setView(false);
            setCards(data);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
          })
          .catch(error => {
            console.error(error);
          });
      };

    useEffect(() => {
        handle("办理银行卡");
      }, []);

    const DrawerNav = styled(Drawer)({
        position: "fixed",
      })


    const drawer = (
        <div className="drawer">          
          <List>
              {['办理银行卡', '宿舍攻略', '专业申请', '社团', '考驾照', '美食', '热门课程'].map((text, index) => (
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
                      {
                        cards.map((card) => {
                          return <>
                                  <ViewCard
                                    class="card"
                                    image={card["image"]}
                                    title={card["title"]}
                                    content={card["content"]}
                                    link={card["link"]}
                                    hover={() => {
                                      console.log("Nothing");
                                    }}
                                    click={() => {
                                      setArticle({ title: card["title"], content: card["article"] });
                                      setView(false);
                                    }}
                                  />                                
                          </> 
                      })
                      }
                    </div>
            </div>
        </>
}