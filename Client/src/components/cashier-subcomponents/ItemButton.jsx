import React, {useLayoutEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';

function ItemButton({width = 150, height = 35, selected = false, onClick, children}) {
    const ref = useRef(null);
    const [customStyle, setCustomStyle] = useState({
        minHeight: height,
        maxHeight: height, 
        minWidth: width, 
        maxWidth: width,
        overflow: "clip"
    });
    
    useLayoutEffect(() => {
        // test for overflow and update the font size after initial render
        const el = ref.current;
        if ((el.clientHeight < el.scrollHeight) || (el.clientWidth < el.scrollWidth)) {
            setCustomStyle({...customStyle, "font-size": el.computedStyleMap().get("font-size").value * .9});
        }
    }, [customStyle])

    return (
        <Button
          variant={selected ? "contained" : "outlined"} 
          disableElevation 
          onClick={onClick}
          sx={customStyle}
          ref={ref}
        >
            {children}
        </Button>
    );
}

export default ItemButton;
