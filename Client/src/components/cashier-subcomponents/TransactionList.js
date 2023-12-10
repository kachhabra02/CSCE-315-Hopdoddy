/**
 * TransactionList Module
 *
 * This module provides the TransactionList component, which displays a list of transactions.
 * It renders a table with item names, prices, and delete buttons for each transaction.
 *
 * @module TransactionList
 */

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

/**
 * TransactionList Component
 *
 * This component displays a list of transactions in a table format. Each row represents a transaction,
 * showing the item name, price, and a delete button for each transaction.
 *
 * @param {Object[]} orders - An array of transaction objects, each containing an item name and price.
 * @param {Function} remover - A callback function to remove a transaction when the delete button is clicked.
 * @returns {JSX.Element} The JSX element representing the transaction list table.
 */
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
        height: '100%', overflow: 'scroll'
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
          {item?.is_modification
            ? (
              <StyledTableCell component="th" scope="row" sx={{pl: 4, fontSize: "1rem",}}>
                {`+ ${item.item_name}`}
              </StyledTableCell>
            ) : (
              <StyledTableCell component="th" scope="row">
                {item.item_name}
              </StyledTableCell>
            )
          }
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