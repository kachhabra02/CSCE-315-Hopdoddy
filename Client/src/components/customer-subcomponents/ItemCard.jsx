import React from "react";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
// import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { MdAddShoppingCart } from "react-icons/md";

const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

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
        // <Tooltip arrow title="item.description goes here">
        //   <ButtonBase>
        //     <Card sx={{minWidth: 200}}>
        //         <CardMedia sx={{height: 200}}>
        //             <img 
        //             // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
        //             src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
        //             alt={item.item_name}
        //             onError={(e) => {
        //                 e.target.onerror = null; // Prevents looping?
        //                 e.target.src = "/images/default.jpg";
        //             }}
        //             height={200}
        //             />
        //         </CardMedia>
        //         <CardContent>
        //             <Button variant="text" onClick={addToCart}>
        //                 {item.item_name}
        //             </Button>
        //         </CardContent>
        //     </Card> 
        //   </ButtonBase>
        // </Tooltip> 

        <Tooltip arrow title="item.description goes here">
          {/* <ButtonBase onClick={addToCart}> */}
            <ImageListItem sx={{width: 250}}>
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
                <ImageListItemBar 
                  title={item.item_name} 
                  subtitle={priceFormat.format(parseFloat(item.price))}
                  actionIcon={
                    <IconButton 
                      onClick={addToCart} 
                      size="small" 
                      sx={{left: -7.5, 
                            color: "white",
                            // bgcolor: 'rgb(255, 255, 255)',
                            "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.54)",
                            }
                         }}
                    >
                        <MdAddShoppingCart/>
                    </IconButton>
                  }
                />
            </ImageListItem>
          {/* </ButtonBase> */}
        </Tooltip> 
    );
}

export default ItemCard;
