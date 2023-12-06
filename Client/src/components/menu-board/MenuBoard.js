import './MenuBoard.css';

import React, { useEffect, useState } from 'react';
import axios from "axios";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel';

function MenuBoard() {

  const [menu, setMenu] = useState(undefined);
  useEffect(() => getMenu(setMenu), []);

  const [featuredItems, setFeaturedItems] = useState(undefined);
  useEffect(() => getFeaturedItems(setFeaturedItems), []);

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

    return <p className="price">${cost}</p>;
  }

  if (!menu) {
    return (
      <div id="menu-board">
        <h1>Menu</h1>
        <p>Loading</p>
      </div>
    );
  }

  if (!featuredItems) {
    return (
      <div>
        <h1>Carousel</h1>
        <p>Loading</p>
      </div>
    )
  }

  // Implementing this handler to create a default image for our menu board (inside public/images/)
  const imageNotFound = (e) => {
    e.target.onerror = null; // Prevents looping
    e.target.src = "/images/default.jpg";
  };

  return (
    <div id="menu-board">
      <h2>Featured Items</h2>
      <div>
        <div id="carousel">
          <Carousel>
              {
                featuredItems.map( item => <Item key={item.item_id} item={item} /> )
              }
          </Carousel>
        </div>

        {Object.keys(menu).map(category => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
                <ul>
                  {menu[category].map((item, index) => (
                    <li key={index}>
                      <Card sx={
                          { width: 1 }
                        }>
                        <CardMedia sx={{height: 175}}>
                          <img 
                            className="imageStyle"
                            // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                            src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                            alt={item.item_name}
                            onError={imageNotFound}
                            height={175}
                          />
                        </CardMedia>
                        <CardContent className="card-content">

                              <p className="nameStyle">{item.item_name}</p>

                              {renderPrice(item)} {/* Formats price */}

                              {renderDescription(item)} {/* Renders description, checking to see whether it should be displayed or not*/}

                        </CardContent>
                      </Card>  
                    </li>
                  ))}
                </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// Styles the item/each individual carousel slide
function Item(props) {
  const { item } = props;

  const imageNotFound = (e) => {
    e.target.onerror = null; // Prevents looping
    e.target.src = "/images/default.jpg";
  };

  const renderPrice = (item) => {
    const floatVal = parseFloat(item.price);
    const cost = floatVal.toFixed(2);

    return <p className="item-price">${cost}</p>;
  }

    return (
      <div className="item-container">
      <CardMedia
        component="img"
        className="item-image"
        // Assuming the image URL is correct
        src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
        alt={item.item_name}
        onError={imageNotFound}
      />
      <div className="item-info">
        <h3 className="item-name">{item.item_name}</h3>
        <p>{renderPrice(item)}</p>
        <p className="item-description">{item.item_description || "Description not available"}</p>
      </div>
    </div>
    );
}

// Utility function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Callback function to get 3 featured items
const getFeaturedItems = (callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/menu/view`)
    .then((res) => {
      if (res.status < 300) {
        const items = res.data

        let featuredItems = items.filter(item => item.feature_item && item.display_item);

        // If featuredItems is less than 3, add random items
        while (featuredItems.length < 3) {
          // Shuffle the array and find items that are not already in featuredItems
          const additionalItems = shuffleArray(items)
            .filter(item => 
              !featuredItems.includes(item) && 
              item.display_item && 
              !item.feature_item
          );

          // Take as many items as needed to fill up to 3
          featuredItems = featuredItems.concat(additionalItems.slice(0, 3 - featuredItems.length));
        }

        featuredItems = featuredItems.slice(0, 3);

        callback(featuredItems);
      }
    })
    .catch( error => console.log(error) );
}

const getMenu = (callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/menu/view`)
    .then((res) => {
      if (res.status < 300) {
        const items = res.data
        // console.log(res.data);

        // Group by only category
        const menu = {};
        items.forEach(item => {
          const { category, sub_category, display_item } = item;

          if (category && sub_category) {

            if (!menu[category]) {
              menu[category] = [];
            }

            // Check here if the item should be displayed prior to pushing it...
            // display_item (t / f) , display_image (t / f) , display_description (t / f) , item_description (words)
            if (display_item === true) {
              menu[category].push(item);
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
