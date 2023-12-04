import React, { useState } from "react";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
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

function ItemCard({item, onUpdate, width}) {
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
            <style>{".MuiTooltip-tooltip {visibility: hidden;}"}</style>
            <ButtonBase onClick={addToCart} 
              sx={{"text-align" : "left", "max-height": width, width: width}}
            >
                <ImageListItem sx={{"min-width": width}}>
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
                              <IconButton 
                              //   onClick={addToCart} 
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
                        <Collapse in={open} collapsedSize={0} 
                        //   sx={{position: "absolute", width: width, bottom: 0, left: width, "z-index": 5}}
                        >
                            <div style={{
                                    "background-color": "white", padding: 10, 
                                    "border-style": "none solid solid", 
                                    "border-color": "rgba(0, 0, 0, 0.54)", 
                                    "border-width": 2
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
