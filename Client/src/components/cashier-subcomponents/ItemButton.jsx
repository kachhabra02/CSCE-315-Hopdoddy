import React, {useLayoutEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';

/**
 * This module contains the ItemButton component, which is a custom button component
 * with adjustable dimensions and font size. It also checks for text overflow and
 * reduces the font size if necessary to prevent overflow.
 *
 * @module ItemButton
 */

/**
 * ItemButton component is a custom button component with adjustable dimensions and font size.
 * It also checks for text overflow and reduces the font size if necessary to prevent overflow.
 *
 * @component
 * @param {number} [width=200] - The width of the button.
 * @param {number} [height=100] - The height of the button.
 * @param {number} [fontSize=30] - The font size of the button text.
 * @param {boolean} [selected=false] - Whether the button is in a selected state.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @returns {JSX.Element} The rendered ItemButton component.
 */
function ItemButton({width = 200, height = 100, fontSize = 30, selected = false, onClick, children}) {
    const ref = useRef(null);
    const [customStyle, setCustomStyle] = useState({
        minHeight: height,
        maxHeight: height, 
        minWidth: width, 
        maxWidth: width,
        overflow: "clip",
        'font-size': fontSize
    });
    
    useLayoutEffect(() => {
        // test for overflow and update the font size after initial render
        const el = ref.current;
        if ((el.clientHeight < el.scrollHeight) || (el.clientWidth < el.scrollWidth)) {
            try {
                setCustomStyle({...customStyle, fontSize: el.computedStyleMap().get("font-size").value * .9});
            } catch (error) {
                console.log(error)
            }
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
