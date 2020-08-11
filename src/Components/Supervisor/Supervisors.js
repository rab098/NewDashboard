import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "../../ComponentsCss/Complaints.css";
import "../../ComponentsCss/Supervisor.css";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import DoneOutlineTwoToneIcon from "@material-ui/icons/DoneOutlineTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import DoneIcon from "@material-ui/icons/Done";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import ClearIcon from "@material-ui/icons/Clear";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid, styled, FormControl, Select, MenuItem } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import Avatar from "@material-ui/core/Avatar";
import { ImpulseSpinner } from "react-spinners-kit";
import Backdrop from "@material-ui/core/Backdrop";
import AddForm from "./AddForm.js";
import EditDialog from "./EditDialog.js";
import axios from "axios";
let store = require("store");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const _headCell = [
//   {
//     id: "name",
//     numeric: true,
//     disablePadding: false,
//     label: "Name",
//   },
// ];
const headCells = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  { id: "town", numeric: false, disablePadding: false, label: "Town" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="tableHead">
      <TableRow>
        <TableCell></TableCell>
        <TableCell
          // colSpan={2}
          key="name"
          align="left"
          padding="none"
          sortDirection={orderBy === "name" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
          >
            NAME
            {/* {console.log(orderBy === _headCell.id)} */}
            {orderBy === "name" ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <Tooltip title="Resolved Complaints">
          <TableCell key="statistics" align="left">
            <DoneIcon
              style={{
                color: "#66bb6a",
                width: "30px",
                height: "30px",
              }}
            />{" "}
          </TableCell>
        </Tooltip>
        <Tooltip title="Active Complaints">
          <TableCell key="statistics" align="left">
            <HourglassFullIcon
              style={{
                color: "#ab47bc",
                width: "30px",
                height: "30px",
              }}
            />
          </TableCell>
        </Tooltip>
        <Tooltip title="Inactive Complaints">
          <TableCell key="statistics">
            <ClearIcon
              style={{
                color: "#ef5350",
                width: "30px",
                height: "30px",
              }}
            />
          </TableCell>
        </Tooltip>
        <Tooltip title="Rejected Complaints">
          <TableCell key="statistics" align="left">
            <PriorityHighIcon
              style={{
                color: "#ffa726",
                width: "30px",
                height: "30px",
              }}
            />
          </TableCell>
        </Tooltip>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="justify"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label.toUpperCase()}
              {/* {console.log(orderBy === headCell.id)} */}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    overflowY: "auto",

    maxWidth: "800px",
    minWidth: "400px",
    backgroundColor: "transparent",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  // table: {
  //   minWidth: 750,
  // },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  _theme: {
    color: theme.palette.getContrastText("#008080"),
    backgroundColor: "#008080",
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },

  header: {
    position: "sticky",
    top: 0,
  },
}));

export default function Supervisors() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [userData, setUserData] = useState(store.get("userData"));
  const [supervisor, setSupervisor] = React.useState("");
  const [supervisors, setSupervisors] = React.useState([]);
  const [rows, setRows] = useState([]);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [towns, setTowns] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogoutAutomatically = () => {
    store.remove("userData");
    store.clearAll();
    setUserData({});
    window.location = "/";
  };
  async function fetchTowns() {
    const townObj = [];
    axios.get("https://m2r31169.herokuapp.com/api/getTowns").then((res) => {
      console.log("Towns" + JSON.stringify(res.data.Towns));

      for (var i in res.data.Towns) {
        if (res.data.Towns[i] !== "Select Town...") {
          console.log("Towns" + res.data.Towns[i]);
          townObj.push(res.data.Towns[i]);
        }
        // finalObj1.push(res.data.supervisors[i].town);
      }
      setTowns(townObj);
      // setTown(finalObj1);
    });
  }

  useEffect(() => {
    fetchTowns();
  }, []);

  async function fetchData() {
    var finalObj = [];
    axios
      .get("https://m2r31169.herokuapp.com/api/getSuperVisor_Town", {
        headers: {
          "x-access-token": userData.accessToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        for (var i in res.data.supervisors) {
          finalObj.push(res.data.supervisors[i]);
          // finalObj1.push(res.data.supervisors[i].town);
        }

        setSupervisors(finalObj);
        setRows(finalObj);
        setLoading(false);
        // setTown(finalObj1);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 400) {
            setLoading(false);
          }
          if (err.response.status === 401 || err.response.status === 403) {
            handleLogoutAutomatically();
          }
          if (err.response.status === 503 || err.response.status === 500) {
            console.log(err.response.status);
          }
        }
      });
  }

  useEffect(() => {
    console.log("aya");
    fetchData();
  }, []);

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.row}>
      <Grid container justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper className="filter elevationPaper">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Box
                  className="box1"
                  textAlign="left"
                  color="#008080"
                  fontWeight="600"
                  fontSize="1.5rem"
                  component="span"
                >
                  Supervisors
                </Box>{" "}
                <Box component="span" style={{ float: "right" }}>
                  {" "}
                  <div>
                    <AddForm town={towns} />
                  </div>
                </Box>
              </div>
            </Grid>
          </Paper>
          {/* 
          <Scrollbars style={{ minWidth: 100, minHeight: 400 }}> */}
          <Scrollbars style={{ minWidth: 100, minHeight: 400, zIndex: 1 }}>
            <Paper className="elevationPaper">
              <TableContainer className="tableContainer">
                <Table
                  className="table"
                  aria-labelledby="tableTitle"
                  // size={dense ? "small" : "medium"}
                  size="medium"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    //numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    //onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />

                  <TableBody className="tableBody">
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        let _res = row.name;
                        let res = _res.substring(0, 1).toUpperCase();
                        return (
                          <TableRow
                            className="tableRow"
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.supervisorId}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              style={{
                                paddingLeft: "16px",
                                paddingRight: "4px",
                              }}
                            >
                              {" "}
                              <Avatar
                                className="gridd"
                                alt="Remy Sharp"
                                src={row.image}
                                className={classes._theme}
                              >
                                {res}
                              </Avatar>{" "}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                paddingLeft: "2px",
                                paddingRight: "16px",
                              }}
                            >
                              {" "}
                              {row.name}
                            </TableCell>{" "}
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">34</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            {/* <TableCell align="left">{row.longitude}</TableCell> */}
                            <TableCell align="left">
                              {row.phoneNumber}
                            </TableCell>
                            <TableCell align="left">{row.town}</TableCell>
                            <TableCell
                              align="left"
                              style={{
                                paddingLeft: "3px",
                                paddingRight: "3px",
                              }}
                            >
                              {/* <EditIcon
                                style={{
                                  color: "#008080",
                                  fontSize: "20px",
                                  padding: 0,
                                  border: 0,
                                }}
                              /> */}
                              <EditDialog
                                town={towns}
                                rowData={row}
                              ></EditDialog>{" "}
                            </TableCell>{" "}
                            <TableCell
                              align="left"
                              style={{
                                paddingLeft: "3px",
                                paddingRight: "16px",
                              }}
                            >
                              <DeleteIcon
                                style={{
                                  color: "#008080",
                                  fontSize: "20px",
                                  padding: 0,
                                  border: 0,
                                }}
                              />
                            </TableCell>
                            {/* <TableCell align="left">
                              <MoreHorizIcon
                                style={{
                                  fontSize: "20px",
                                  color: "#8A8A8A",
                                }}
                              />
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>{" "}
          </Scrollbars>{" "}
          <TablePagination
            rowsPerPageOptions={[10, 15, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>{" "}
      </Grid>

      <Backdrop key={rows.length} className={classes.backdrop} open={loading}>
        <ImpulseSpinner size={90} color="#008081" loading={loading} />
      </Backdrop>

      {/* {Object.keys(assignSupervisor).length > 0 && ( */}
    </div>
  );
}
