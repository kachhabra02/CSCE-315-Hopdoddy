/**
 * This module provides a React component for displaying an item card with details like item name, price, and description.
 * Users can click to view item descriptions and add items to their cart.
 * @module ItemCard
 */

import React, { useState } from "react";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from "@mui/material/ButtonBase";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { MdAddShoppingCart } from "react-icons/md";
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});


/**
 * @param {Object} props - Component props.
 * @param {Object} props.item - Item data, including item_name, price, and item_description.
 * @param {Function} props.onUpdate - Function to call when an update is needed.
 * @param {number} props.width - Width of the item card.
 * @param {Function} props.modifier - Function to execute when the item card is clicked.
 * @returns {React.Component} An item card with details and interaction.
 */
function ItemCard({item, onUpdate, width, modifier}) {
    const [open, setOpen] = useState(false);

    function addToCart() {
        const orders = JSON.parse(localStorage.getItem("cart"));
        // const orders = localStorage.getItem("cart");
        // console.log(orders);
        const newOrders = orders ? orders.concat([item]) : [item];
        onUpdate({});
        localStorage.setItem("cart", JSON.stringify(newOrders));
    }

    return (
        <Tooltip title="Description" enterTouchDelay={0} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
            <ButtonBase 
              onClick={modifier(item)} 
              sx={{textAlign : "left", maxHeight: width, width: width}}
            >
                <ImageListItem sx={{minWidth: width}}>
                    <img 
                        // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                        src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                        alt={item.item_name}
                        onError={(e) => {
                            e.target.onerror = null; // Prevents looping?
                            e.target.src = "/images/default.jpg";
                        }}
                        height={200}
                        width={200}
                    />
                    <Stack direction="column" sx={{position: "absolute", bottom: 0, width: "100%"}}>
                        <ImageListItemBar 
                          title={item.item_name} 
                          subtitle={priceFormat.format(parseFloat(item.price))}
                          sx={{position: "relative"}}
                          actionIcon={
                            <div style={{paddingRight: 10}}>
                                <MdAddShoppingCart fontSize="large" color="white"/>
                            </div>
                          }
                        />
                        <Collapse in={open} collapsedSize={0} 
                        //   sx={{position: "absolute", width: width, bottom: 0, left: width, "z-index": 5}}
                        >
                            <div style={{
                                    backgroundColor: "white", padding: 10, 
                                    borderStyle: "none solid solid", 
                                    borderColor: "rgba(0, 0, 0, 0.54)", 
                                    borderWidth: 2
                                }}
                            >
                                {item.item_description}
                            </div>
                        </Collapse>
                    </Stack>
                </ImageListItem>
            </ButtonBase>
        </Tooltip> 
    );
}

export default ItemCard;
