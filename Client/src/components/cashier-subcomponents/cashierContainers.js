import React from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ScrollContainer = styled('div')({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  padding: 2,
});

export const WrapContainer = styled('div')({
  padding: 2,
});

const spacing = 1;

/**
 * Module containing the DynamicButtonGrid component.
 * @module DynamicButtonGrid
 */

/**
 * A horizontally scrollable or wrapable grid for rendering elements or buttons.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The elements or buttons to be displayed in the grid.
 * @param {boolean} props.shouldScroll - Determines if the grid should be horizontally scrollable.
 * @returns {JSX.Element} The rendered component.
 */
export function DynamicButtonGrid({ children, shouldScroll }) {
  return (
    <Box>
      {shouldScroll ? (
        <ScrollContainer>
          {React.Children.map(children, (child, index) => (
            <div key={index} style={{ display: 'inline-block', marginRight: spacing * 8 }}>
              {child}
            </div>
          ))}
        </ScrollContainer>
      ) : (
        <WrapContainer>
          <Grid container spacing={spacing}>
            {React.Children.map(children, (child, index) => (
              <Grid key={index} item>
                {child}
              </Grid>
            ))}
          </Grid>
        </WrapContainer>
      )}
    </Box>
  );
}