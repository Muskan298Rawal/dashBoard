import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    tableData: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        "& p": {
            fontSize: "20px",
            fontWeight: "700"
        },
        "& .MuiPaper-root.MuiTableContainer-root": {
            width: "80%"
        }
    },
  }));

function TableData({tableData}) {
    const classes = useStyles()
    return (
        <div className={classes.tableData}>
        <p>Table Data</p>
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Publisher Id</TableCell>
              <TableCell align="right">Impressions Offered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && tableData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{row.publisherId}</TableCell>
                <TableCell align="right">{row.impressions_offered}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
}

export default TableData



