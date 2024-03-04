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
import MenuIcon from '@mui/icons-material/Menu'; 
import "./StaticResources.css";

export default function Student(props) {
    const [cards, setCards] = useState([]);
    const [types, setTypes] = useState([]); // State to store the types for tabs
    const [selectedType, setSelectedType] = useState(null);
    const host = process.env.REACT_APP_BACKEND_HOST;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    // Fetch the types for the tabs and initial data
    useEffect(() => {
      fetch(host + '/resources/getTypes')
        .then(response => response.json())
        .then(data => {
          const orderedTypes = ["社团汇总", "专业申请", "宿舍攻略", "租房攻略", "证件攻略"];
          
          const sortedTypes = data.sort((a, b) => {
            let indexA = orderedTypes.indexOf(a);
            let indexB = orderedTypes.indexOf(b);
            indexA = indexA === -1 ? 999 : indexA;
            indexB = indexB === -1 ? 999 : indexB;
            
            return indexA - indexB;
          });
  
          setTypes(sortedTypes);
  
        })
        .catch(error => console.error(error));
      handle("社团汇总"); // Default type or initial type
    }, []);


    const handle = (type) => {
        fetch(host + '/resources/getStaticResource?type=' + type)
          .then(response => response.json())
          .then(data => {
            setCards(data);
            setSelectedType(type);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => console.error(error));
    };

    const DrawerNav = styled(Drawer)({
        position: "fixed",
    });

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const isSmallScreen = window.innerWidth < 600;



    const drawer = (
        <div className="drawer">
          <List>
              {types.map((type, index) => (
                <ListItem className={"selected-drawer"} key={type} disablePadding>
                  <ListItemButton onClick={() => handle(type)} 
                  style={{backgroundColor: selectedType === type ? '#f0f0f0' : 'transparent'}}>
                    <ListItemIcon className="nav-icon">
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText className="nav-text" primary={type} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </div>
    );

    return (
        <div>
            <div className='menu-button' onClick={toggleDrawer}>
              <i className='fas fa-bars'/>
           </div>
            {(
                <>
                    {isSmallScreen ? (
                        <DrawerNav
                            id="static-resources-nav"
                            variant="temporary"
                            open={isDrawerOpen}
                            onClose={toggleDrawer}
                        >
                             <i className='fas fa-times' onClick={toggleDrawer}/>
                            {drawer}
                           
                        </DrawerNav>
                    ) : (
                        <DrawerNav static-resources-nav variant="permanent">
                            {drawer}
                        </DrawerNav>
                    )}

                    {isSmallScreen && selectedType && (
                        <h1 className="page-heading">{selectedType}</h1>
                    )}

                    <div className="staticRecourseCards">
                        {cards.map((card) => (
                            <ViewCard
                                key={card._id}
                                title={card.title}
                                intro={card.intro}
                                img={card.img}
                                urls={card.urls}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}