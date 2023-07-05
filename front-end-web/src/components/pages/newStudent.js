import React, { useState, useEffect } from "react";
import ViewCard from './ViewCard';
import "./ViewCard.css";
import "./Article.css";
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
import Major from "./Major";


export default function Student(props) {
    const myMap = new Map();
    myMap.set('办理银行卡', 'bank');
    myMap.set('宿舍攻略', 'dorm');
    myMap.set('专业申请', 'department');
    myMap.set('社团', 'club');
    myMap.set('热门课程', 'class');
    myMap.set('考驾照', 'drive');
    myMap.set('美食', 'food');

    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(true);
    const [major, setMajor] = useState('');

    const handle = (text) => {
        fetch('http://localhost:4567/newStudent?resource=' + myMap.get(text))
          .then(response => response.json())
          .then(data => {
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
            <div>
              { page ? <>
              <DrawerNav variant="permanent">
              {drawer}
              </DrawerNav>
              <div className="allContent">
                {(cards.map((card) => {
                  return <>
                    <ViewCard
                      class={(card["group"] === "department") ? "circle" : "card"}
                      image={card["image"]}
                      title={card["title"]}
                      content={card["content"]}
                      link={card["link"]}
                      hover={() => {
                        console.log("Nothing");
                      } }
                      click={() => {
                        setMajor(card["major"]);
                        setPage(false);
                      } } />
                  </>;
                }))}
              </div>
            </> :
            <Major major={major} click={() => {
              setPage(true);
            }}/>}
        </div>
        </>
}