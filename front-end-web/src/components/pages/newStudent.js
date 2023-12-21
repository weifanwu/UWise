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

export default function Student(props) {
    const [cards, setCards] = useState([]);
    const [types, setTypes] = useState([]); // State to store the types for tabs

    // Fetch the types for the tabs and initial data
    useEffect(() => {
        fetch('http://localhost:8000/resources/getTypes')
          .then(response => response.json())
          .then(data => setTypes(data))
          .catch(error => console.error(error));
        handle("社团"); // Default type or initial type
    }, []);

    const handle = (type) => {
        fetch('http://localhost:8000/resources/getStaticResource?type=' + type)
          .then(response => response.json())
          .then(data => {
            setCards(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => console.error(error));
    };

    const DrawerNav = styled(Drawer)({
        position: "fixed",
    });

    const drawer = (
        <div className="drawer">
          <List>
              {types.map((type, index) => (
                <ListItem key={type} disablePadding>
                  <ListItemButton onClick={() => handle(type)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={type} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </div>
    );

    return (
        <div>
            {(
                <>
                    <DrawerNav variant="permanent">
                        {drawer}
                    </DrawerNav>
                    <div className="staticRecourseCards">
                        {cards.map((card) => (
                            <ViewCard
                                key={card._id}
                                title={card.title}
                                intro={card.intro}
                                img={card.img}
                                url={card.url}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}