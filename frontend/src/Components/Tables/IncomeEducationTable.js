import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./IncomeEducationTable.css";

const IncomeEducationTable = (props) => {
  const { data, region, dropdown1, dropdown2, dropdown3, dropdown4 } = props;

  const [lambda1, setLambda1] = useState(0);
  const [lambda2, setLambda2] = useState(0);
  const [beta, setBeta] = useState(0);

  useEffect(() => {
    if (data.length === 2) {
      setLambda1(data[0].medianHHIncome / data[0].y2020 / 100000);
      setLambda2(data[1].medianHHIncome / data[1].y2020 / 100000);
      setBeta(lambda1 / lambda2);
    }
  }, [data, region]);

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  console.log("DATAAAA", data);

  return (
    <div>
      {region === "state" && (
        <div className="table-header">
          <img
            width={1000}
            height={100}
            src={require("./state1.jpeg")}
            alt="State 1"
          />
          {beta !== 0 && (
            <div>
              <h2>&beta; = {beta}</h2>
              <img
                width={200}
                height={100}
                src={require("./state2.jpeg")}
                alt="State 2"
              />
            </div>
          )}
        </div>
      )}
      {region === "county" && (
        <div className="table-header">
          <img
            width={1000}
            height={100}
            src={require("./county1.jpeg")}
            alt="County 1"
          />
          {beta !== 0 && (
            <div>
              <h2>&beta; = {beta}</h2>
              <img
                width={200}
                height={100}
                src={require("./county2.jpeg")}
                alt="County 2"
              />
            </div>
          )}
        </div>
      )}
      <h3>
        Note: Columns with years 1970-2020 represent percent of adult residents
        with a bachelor's degree or higher
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              {(region === "state" || region === "county") && (
                <StyledTableCell align="center">&lambda;</StyledTableCell>
              )}
              <StyledTableCell align="center">medianHHIncome</StyledTableCell>
              <StyledTableCell align="center">
                percentStateMHHIncome
              </StyledTableCell>
              <StyledTableCell align="center">
                unemploymentY2020
              </StyledTableCell>
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
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                {(region === "state" || region === "county") && (
                  <StyledTableCell align="center">
                    {row.medianHHIncome / row.y2020 / 100000}
                  </StyledTableCell>
                )}
                <StyledTableCell align="center">
                  {row.medianHHIncome}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.percentStateMHHIncome === 0
                    ? "N/A"
                    : row.percentStateMHHIncome}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.unemploymentY2020}
                </StyledTableCell>
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
};

export default IncomeEducationTable;
