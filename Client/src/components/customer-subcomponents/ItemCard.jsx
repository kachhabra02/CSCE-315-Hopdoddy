import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";

function ItemCard({name}) {
    return (
      <Card>
        <CardMedia sx={{height: 200}}>
            <img 
                // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                src={`/images/${name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                alt={name}
                onError={(e) => {
                    e.target.onerror = null; // Prevents looping?
                    e.target.src = "/images/default.jpg";
                }}
                height={200}
            />
        </CardMedia>
        <CardContent>
            <Button variant="text">
                {name}
            </Button>
        </CardContent>
      </Card>  
    );
}

export default ItemCard;
