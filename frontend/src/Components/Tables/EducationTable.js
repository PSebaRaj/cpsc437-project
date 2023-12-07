import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EducationTable = (props) => {

  const { data } = props;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <h3>Percent of adult residents with a bachelor's degree or higher</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">1970</StyledTableCell>
              <StyledTableCell align="center">1980</StyledTableCell>
              <StyledTableCell align="center">1990</StyledTableCell>
              <StyledTableCell align="center">2000</StyledTableCell>
              <StyledTableCell align="center">2010</StyledTableCell>
              <StyledTableCell align="center">2020</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.y1970}</StyledTableCell>
                <StyledTableCell align="center">{row.y1980}</StyledTableCell>
                <StyledTableCell align="center">{row.y1990}</StyledTableCell>
                <StyledTableCell align="center">{row.y2000}</StyledTableCell>
                <StyledTableCell align="center">{row.y2010}</StyledTableCell>
                <StyledTableCell align="center">{row.y2020}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EducationTable;