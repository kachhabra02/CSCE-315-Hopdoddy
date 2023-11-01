
import './MenuBoard.css';

import React, { useEffect, useState } from 'react';
import axios from "axios";

function MenuBoard() {

  const [menu, setMenu] = useState(undefined);

  useEffect(() => getMenu(setMenu), []);

  if (!menu) {
    return (
      <div id="menu-board">
        <h1>Menu</h1>
        <p>Loading</p>
      </div>
    );
  }

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
                    <li key={index}>{item.item_name}</li>
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
          const { category, sub_category } = item;
          if (category && sub_category) {
            if (!menu[category]) {
              menu[category] = {};
            }
            if (!menu[category][sub_category]) {
              menu[category][sub_category] = [];
            }
            menu[category][sub_category].push(item);
          }
        });

        console.log(menu);
        callback(menu);
      }
    })
    .catch( error => console.log(error) );
}

export default MenuBoard
