import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";

function ItemCard({name}) {
    return (
      <Card>
        <CardContent>
            <Button variant="text">
                {name}
            </Button>
        </CardContent>
      </Card>  
    );
}

export default ItemCard;
