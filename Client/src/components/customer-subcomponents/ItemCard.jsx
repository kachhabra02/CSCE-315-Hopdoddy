import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";

function ItemCard({item, onUpdate}) {
    function addToCart() {
        const orders = JSON.parse(localStorage.getItem("cart"));
        // const orders = localStorage.getItem("cart");
        // console.log(orders);
        const newOrders = orders ? orders.concat([item]) : [item];
        onUpdate({});
        localStorage.setItem("cart", JSON.stringify(newOrders));
    }

    return (
      <Card>
        <CardMedia sx={{height: 200}}>
            <img 
              // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
              src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
              alt={item.item_name}
              onError={(e) => {
                e.target.onerror = null; // Prevents looping?
                e.target.src = "/images/default.jpg";
              }}
            height={200}
            />
        </CardMedia>
        <CardContent>
            <Button variant="text" onClick={addToCart}>
                {item.item_name}
            </Button>
        </CardContent>
      </Card>  
    );
}

export default ItemCard;
