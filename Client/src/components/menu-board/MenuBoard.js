
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

  useEffect(() => getMenu(setMenu), []);

  const renderDescription = (item) => {
    // Print out item_description, if it's empty then put "Description not available"
    if (item.display_description) {
      return <p className="description">{item.item_description || "Description not available"}</p>;
    }
    
    // If we're not displaying description, say it isn't available
    else {
      return <p className="description"></p>;
    }
  }

  const renderPrice = (item) => {
    const floatVal = parseFloat(item.price);
    const cost = floatVal.toFixed(2);

    return <strong><p>${cost}</p></strong>;
  }

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
      <div>
        {Object.keys(menu).map(category => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            {Object.keys(menu[category]).map(sub_category => (
              <div key={sub_category} className="sub-category-section">
                <h3>{sub_category}</h3>
                <ul>
                  {menu[category][sub_category].map((item, index) => (
                    <li key={index}>
                      <Card sx={
                          { 
                            width: 300, 
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
                            transition: '0.3s',
                            '&:hover': {
                              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                            }
                          }
                        }>
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
                            <Box textAlign="center">

                              <p className="nameStyle">{item.item_name}</p>

                              {renderPrice(item)} {/* Formats price */}

                              {renderDescription(item)} {/* Renders description, checking to see whether it should be displayed or not*/}

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
        // console.log(res.data);

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

        // console.log(menu);
        callback(menu);
      }
    })
    .catch( error => console.log(error) );
}

export default MenuBoard
