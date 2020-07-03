import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function SupervisorTable(props) {
  const { data, selected, handleClick } = props;

  const GreenCheckbox = withStyles({
    root: {
      color: "teal",
      "&$checked": {
        color: "teal",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const useStyles = makeStyles({
    table: {
      minWidth: 250,
    },
  });

  const classes = useStyles();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <TableContainer component={Paper}>
      {data.length < 1 && <Box>{data.length}</Box>}
      {data.length > 0 && (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Supervisor</TableCell>
              <TableCell align="center">Town</TableCell>
              <TableCell align="center">Number of Complaints</TableCell>
              <TableCell align="center">Assign complaints</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (user) =>
                user != null && (
                  <TableRow key={JSON.stringify(user.supervisorName)}>
                    <TableCell align="center">
                      {user.supervisorName.name}
                    </TableCell>
                    <TableCell align="center">
                      {user.supervisorName.town}
                    </TableCell>
                    <TableCell align="center">
                      {user.complaint.length}
                    </TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={isSelected(user.supervisorName.name)}
                            onChange={(event) =>
                              handleClick(event, user.supervisorName.name)
                            }
                            name="checkedG"
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
