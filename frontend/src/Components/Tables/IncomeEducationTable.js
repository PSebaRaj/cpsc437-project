import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IncomeEducationTable = (props) => {

  const { data } = props;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">medianHHIncome</TableCell>
              <TableCell align="right">percentStateMHHIncome</TableCell>
              <TableCell align="right">unemploymentY2020</TableCell>
              <TableCell align="right">y1970</TableCell>
              <TableCell align="right">y1980</TableCell>
              <TableCell align="right">y1990</TableCell>
              <TableCell align="right">y2000</TableCell>
              <TableCell align="right">y2010</TableCell>
              <TableCell align="right">y2020</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.medianHHIncome}</TableCell>
                <TableCell align="right">{row.percentStateMHHIncome}</TableCell>
                <TableCell align="right">{row.unemploymentY2020}</TableCell>
                <TableCell align="right">{row.y1970}</TableCell>
                <TableCell align="right">{row.y1980}</TableCell>
                <TableCell align="right">{row.y1990}</TableCell>
                <TableCell align="right">{row.y2000}</TableCell>
                <TableCell align="right">{row.y2010}</TableCell>
                <TableCell align="right">{row.y2020}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default IncomeEducationTable;