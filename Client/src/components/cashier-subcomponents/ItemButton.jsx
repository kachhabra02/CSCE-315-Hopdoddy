import React, {useLayoutEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';

function ItemButton({onClick, children}) {
    const ref = useRef(null);
    // const [fontSize, setFontSize] = useState(null);
    const [customStyle, setCustomStyle] = useState({
        maxHeight: 35, 
        overflow: "clip", 
        minWidth: 150, 
        maxWidth: 150
    });
    
    useLayoutEffect(() => {
        // test for overflow and update the font size after initial render
        const el = ref.current;

        // console.log(el.clientHeight, el.scrollHeight)
        if ((el.clientHeight < el.scrollHeight)) {
            // setFontSize(el.computedStyleMap().fontSize * .75);
            // console.log(el.computedStyleMap().get("font-size"));
            setCustomStyle({...customStyle, "font-size": el.computedStyleMap().get("font-size").value * .9});
        }
        // console.log(el.clientHeight, el.scrollHeight, el.clientWidth, el.scrollWidth)
    }, [customStyle])

    return (
        <Button
          variant="outlined" 
          disableElevation 
          onClick={onClick}
          sx={customStyle}
          ref={ref}
        >
            <span >{children}</span>
        </Button>
    );
}

export default ItemButton;
