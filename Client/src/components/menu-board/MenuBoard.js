
import './MenuBoard.css';

import React, { useEffect, useState } from 'react';
import axios from "axios";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";

function MenuBoard() {

  const [menu, setMenu] = useState(undefined);
  const [activeItem, setActiveItem] = useState(null); // New state for tracking active item

  useEffect(() => getMenu(setMenu), []);

  const displayDescription = (item) => {
    // Toggle the active item: if it's already active, deactivate it; otherwise, activate it
    if (activeItem && activeItem.item_name === item.item_name) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  if (!menu) {
    return (
      <div id="menu-board">
        <h1>Menu</h1>
        <p>Loading</p>
      </div>
    );
  }

  // Implementing this handler to create a default image for our menu board (inside public/images/)
  const imageNotFound = (e) => {
    e.target.onerror = null; // Prevents looping
    e.target.src = "/images/default.jpg";
  };

  return (
    <div id="menu-board">
      <h1>Menu</h1>
      <div>
        {Object.keys(menu).map(category => (
          <div key={category}>
            <h2>{category}</h2>
            {Object.keys(menu[category]).map(sub_category => (
              <div key={sub_category}>
                <h3>{sub_category}</h3>
                <ul>
                  {menu[category][sub_category].map((item, index) => (
                    // <li key={index}>{item.item_name}</li>
                    <li key={index}>
                      {/* 
                      <img 
                        // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                        src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                        alt={item.item_name}
                        onError={imageNotFound}
                      />
                      {item.item_name}

                       */}

                      <Card sx={{width: 300}}>
                        <CardMedia sx={{height: 300}}>
                          <img 
                            // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                            src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                            alt={item.item_name}
                            onError={imageNotFound}
                            height={300}
                          />
                        </CardMedia>
                        <CardContent>
                            {/* <Button variant="text" onClick={addToCart}> */}
                            <Box textAlign="center">
                              <Button variant="text" onClick={() => displayDescription(item)}>
                                {item.item_name}
                                  {/* {item.item_name} */}
                              </Button>
                              {activeItem && activeItem.item_name === item.item_name && item.display_description && (
                              <p>{item.item_description}</p>
                              )}
                              
                            </Box>
                        </CardContent>
                      </Card>  
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const getMenu = (callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/menu/view`)
    .then((res) => {
      if (res.status < 300) {
        const items = res.data
        console.log(res.data);

        // Group by category and subcategory
        const menu = {};
        items.forEach(item => {
          const { category, sub_category, display_item } = item;
          if (category && sub_category) {
            if (!menu[category]) {
              menu[category] = {};
            }
            if (!menu[category][sub_category]) {
              menu[category][sub_category] = [];
            }

            // display_item (t / f) , display_image (t / f) , display_description (t / f) , item_description (words)
            
            // Check here if the item should be displayed prior to pushing it...
            if (display_item == true) {
              menu[category][sub_category].push(item);
            }

          }
        });

        console.log(menu);
        callback(menu);
      }
    })
    .catch( error => console.log(error) );
}

export default MenuBoard
