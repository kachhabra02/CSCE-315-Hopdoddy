import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { styled } from '@mui/material/styles';

// Styled components for larger text and spacing
const StyledTableCell = styled(TableCell)({
  fontSize: '1.2rem', // Larger font size
});
  
const StyledButton = styled(Button)({
  minWidth: '48px', // Larger button for easier clicking
  padding: '6px 12px',
});
  
const StyledIcon = styled(BsFillTrash3Fill)({
  fontSize: '1.5rem', // Larger icon size
});

function TransactionList({ orders, remover }) {
  const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <TableContainer 
      component={Box} 
      sx={{
        maxHeight: '100%'
      }}
    >
      <Table stickyHeader aria-label="transaction list">
      <TableHead>
        <TableRow>
        <StyledTableCell>Item Name</StyledTableCell>
        <StyledTableCell align="right">Price</StyledTableCell>
        <StyledTableCell align="right">Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((item, index) => (
        <TableRow key={index}>
          <StyledTableCell component="th" scope="row">
          {item.item_name}
          </StyledTableCell>
          <StyledTableCell align="right">{priceFormat.format(parseFloat(item.price))}</StyledTableCell>
          <StyledTableCell align="right">
          <StyledButton color="error" onClick={remover(index)}>
            <StyledIcon />
          </StyledButton>
          </StyledTableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionList;