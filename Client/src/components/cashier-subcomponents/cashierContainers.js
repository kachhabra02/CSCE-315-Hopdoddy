import React from "react";
// import Button from '@mui/material/Button';
import ItemButton from "./ItemButton";
import { Stack, Button } from "@mui/material";
// import ButtonGroup from '@mui/material/ButtonGroup';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const ScrollContainer = styled('div')({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  padding: 20, // adjust as needed
});

export const WrapContainer = styled('div')({
  padding: 20, // adjust as needed
});

export function DynamicButtonGrid({ children, shouldScroll }) {
  return (
    <Paper>
      {shouldScroll ? (
        <ScrollContainer>
          {React.Children.map(children, (child, index) => (
            <div key={index} style={{ display: 'inline-block', marginRight: 8 }}>
              {child}
            </div>
          ))}
        </ScrollContainer>
      ) : (
        <WrapContainer>
          <Grid container spacing={2}>
            {React.Children.map(children, (child, index) => (
              <Grid key={index} item>
                {child}
              </Grid>
            ))}
          </Grid>
        </WrapContainer>
      )}
    </Paper>
  );
}