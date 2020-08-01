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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { Grid, styled, FormControl, Select, MenuItem } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import Avatar from "@material-ui/core/Avatar";
import { ImpulseSpinner } from "react-spinners-kit";
import Backdrop from "@material-ui/core/Backdrop";
import AddForm from "./AddForm.js";
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

const _headCell = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
];
const headCells = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  // {
  //   id: "supervisor",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Supervisor",
  // },
  //  { id: "date", numeric: true, disablePadding: false, label: "Date" },
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
        <TableCell
          key="name"
          align="center"
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   paper: {
//     // maxHeight:"8n00px",
//     overflowY: "auto",

//     // maxWidth: "800px",
//     // minWidth:"400px",
//     backgroundColor: "transparent",
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     // minWidth: "50vw",
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
//   backdrop: {
//     zIndex: 1,
//     color: "#fff",
//   },
// }));

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

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
  table: {
    minWidth: 750,
  },
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
}));

export default function EnhancedTable() {
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

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
          <Paper className="filter elevationPaper" stickyHeader>
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
                    <AddForm />
                  </div>
                </Box>
              </div>
            </Grid>
          </Paper>
          {/* 
          <Scrollbars style={{ minWidth: 100, minHeight: 400 }}> */}
          <Paper className="elevationPaper">
            <TableContainer className="tableContainer">
              <Table
                className={classes.table}
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      let _res = row.name;
                      let res = _res.substring(0, 1);
                      return (
                        <TableRow
                          className="tableRow"
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.supervisorId}
                        >
                          {/* <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="right"
                              padding="1px"
                            >
                              {" "}
                              <Avatar
                                alt="Remy Sharp"
                                src={row.image}
                                className={classes._theme}
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                B
                              </Avatar>
                            </TableCell>

                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="left"
                              padding="none"
                            >
                              {" "}
                              {row.name}
                            </TableCell>
                            */}
                          {/* <TableCell align="right" padding-left="none">
                              <Avatar
                                src={row.image}
                                className={classes._theme}
                                style={{
                                  fontSize: "16px",
                                  padding: 0,
                                  border: 0,
                                }}
                              >
                                B
                              </Avatar>
                            </TableCell> */}

                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Grid
                              className="gridd"
                              // align="right"
                              container
                              direction="row"
                              justify="flex-end"
                            >
                              {/* align="right" */}
                              <Grid item>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={row.image}
                                  className={classes._theme}
                                >
                                  {res}
                                </Avatar>
                              </Grid>
                              <Grid
                                item
                                xs
                                zeroMinWidth
                                // align="left"
                                style={{
                                  padding: "10px",
                                }}
                              >
                                <Typography style={{ fontSize: "14px" }}>
                                  {row.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            {/* {" "}
                              <Grid
                                container
                                container
                                direction="row"
                                justify="center"
                              >
                                <Grid item width="20%">
                                  {" "}
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={row.image}
                                    className={classes._theme}
                                    style={{
                                      fontSize: "16px",
                                      padding: 0,
                                      border: 0,
                                    }}
                                  >
                                    B
                                  </Avatar>{" "}
                                </Grid>
                                <Grid item width="80%" padding="none">
                                  {row.name}{" "}
                                </Grid>
                              </Grid>
                            */}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          {/* <TableCell align="left">{row.longitude}</TableCell> */}
                          <TableCell align="left">{row.phoneNumber}</TableCell>
                          <TableCell align="left">{row.town}</TableCell>
                          <TableCell align="left">
                            <EditTwoToneIcon
                              style={{
                                color: "#008080",
                                fontSize: "20px",
                                padding: 0,
                                border: 0,
                              }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <DeleteTwoToneIcon
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
          </Paper>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      <Backdrop key={rows.length} className={classes.backdrop} open={loading}>
        <ImpulseSpinner size={90} color="#008081" loading={loading} />
      </Backdrop>

      {/* {Object.keys(assignSupervisor).length > 0 && ( */}
    </div>
  );

  // return (
  //   <div className="table">
  //     <Paper className="elevationPaper">
  //       {" "}
  //       <Scrollbars style={{ minWidth: 100, minHeight: 200 }}>
  //         {" "}
  //         <TableContainer>
  //           <Table
  //             className={classes.table}
  //             aria-labelledby="tableTitle"
  //             aria-label="enhanced table"
  //             size="medium"
  //           >
  //             <EnhancedTableHead
  //               classes={classes}
  //               //numSelected={selected.length}
  //               order={order}
  //               orderBy={orderBy}
  //               // onSelectAllClick={handleSelectAllClick}
  //               onRequestSort={handleRequestSort}
  //               rowCount={rows.length}
  //             />
  //             <TableBody className="tableBody">
  //               {stableSort(rows, getComparator(order, orderBy))
  //                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //                 .map((row, index) => {
  //                   const labelId = `enhanced-table-checkbox-${index}`;

  //                   return (
  //                     <TableRow
  //                       hover
  //                       className="tableRow"
  //                       role="checkbox"
  //                       tabIndex={-1}
  //                       key={row.supervisorId}
  //                     >
  //                       <TableCell
  //                         component="th"
  //                         id={labelId}
  //                         scope="row"
  //                         align="center"
  //                         padding="none"
  //                       >
  //                         {row.name}
  //                       </TableCell>
  //                       <TableCell align="left">{row.email}</TableCell>
  //                       <TableCell align="left">{row.phoneNumber}</TableCell>
  //                       <TableCell align="left">{row.town}</TableCell>

  //                       <TableCell align="left">
  //                         <MoreHorizIcon
  //                           style={{
  //                             fontSize: "20px",
  //                             color: "#8A8A8A",
  //                           }}
  //                           onClick={() => handleClickOpen(row)}
  //                         />
  //                       </TableCell>
  //                     </TableRow>
  //                   );
  //                 })}

  //               {emptyRows > 0 && (
  //                 <TableRow>
  //                   <TableCell colSpan={6} />
  //                 </TableRow>
  //               )}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //       </Scrollbars>
  //       <TablePagination
  //         rowsPerPageOptions={[5, 10, 25]}
  //         component="div"
  //         count={rows.length}
  //         rowsPerPage={rowsPerPage}
  //         page={page}
  //         onChangePage={handleChangePage}
  //         onChangeRowsPerPage={handleChangeRowsPerPage}
  //       />{" "}
  //     </Paper>{" "}
  //     {/* <FormControlLabel
  //       control={<Switch checked={dense} onChange={handleChangeDense} />}
  //       label="Dense padding"
  //     /> */}
  //   </div>
  // );
}

// import "../ComponentsCss/Complaints.css";
// import axios from "axios";
// import Box from "@material-ui/core/Box";

// import Moment from "moment";
// import SelectFilter from "./Complaint/SelectFilter";

// import Status from "./Complaint/Status";
// import Visualize from "./Complaint/Charts/Visualize";
// import PriorityVisualize from "./Complaint/Charts/PriorityVisualize";
// import EditIcon from "@material-ui/icons/Edit";
// import React from "react";
// import PropTypes from "prop-types";
// import { Grid, styled } from "@material-ui/core";
// import clsx from "clsx";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";

// import { useState, useEffect } from "react";
// import { Dialog } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import { Scrollbars } from "react-custom-scrollbars";

// let store = require("store");

// function descendingComparator(a, b, orderBy) {
//   console.log(
//     "order by " + orderBy + "aaaa" + a[orderBy] + "bbbb" + b[orderBy]
//   );
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     console.log("ttttt" + order);
//     if (order !== 0) return order;

//     return a[1] - b[1];
//   });
//   //console.log("ssssssssssssssss" +JSON.stringify(stabilizedThis));
//   return stabilizedThis.map((el) => el[0]);
// }

// class EnhancedTableHead extends React.Component {
//   render() {
//     const headCells = [
//       { id: "id", numeric: true, disablePadding: false, label: "Name" },
//       {
//         id: "email",
//         numeric: false,
//         disablePadding: false,
//         label: "Email",
//       },
//       // {
//       //   id: "supervisor",
//       //   numeric: false,
//       //   disablePadding: false,
//       //   label: "Supervisor",
//       // },
//       //  { id: "date", numeric: true, disablePadding: false, label: "Date" },
//       {
//         id: "phoneNumber",
//         numeric: true,
//         disablePadding: false,
//         label: "Phone Number",
//       },
//       { id: "town", numeric: false, disablePadding: false, label: "Town" },
//     ];
//     const {
//       classes,
//       onSelectAllClick,
//       order,
//       orderBy,
//       numSelected,
//       rowCount,
//       onRequestSort,
//     } = this.props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };
//     console.log("lalllllllllllllllllllllllllllll");
//     console.log(orderBy);

//     return (
//       <TableHead className="tableHead">
//         <TableRow>
//           {/* <TableCell padding="checkbox">
//             <Checkbox
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={rowCount > 0 && numSelected === rowCount}
//               onChange={onSelectAllClick}
//               inputProps={{ "aria-label": "select all desserts" }}
//             />
//           </TableCell> */}
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align="left"
//               padding={headCell.disablePadding ? "none" : "default"}
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : "asc"}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label.toUpperCase()}
//                 {console.log(orderBy === headCell.id)}
//                 {orderBy === headCell.id ? (
//                   <span className={classes.visuallyHidden}>
//                     {order === "desc"
//                       ? "sorted descending"
//                       : "sorted ascending"}
//                   </span>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected, onFilter } = props;

//   return (
//     <div className={"toolbar"}>
//       <Status name="All" onFilterTable={onFilter} buttonComp="button" />
//       <br />
//       <Status name="Resolved" onFilterTable={onFilter} buttonComp="button" />
//       <br />
//       <Status name="Unresolved" onFilterTable={onFilter} buttonComp="button" />
//       <br />

//       <Status name="Rejected" onFilterTable={onFilter} buttonComp="button" />
//       <br />
//       <Status name="Assigned" onFilterTable={onFilter} buttonComp="button" />
//     </div>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onFilter: PropTypes.func.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   paper: {
//     // maxHeight:"8n00px",
//     overflowY: "auto",

//     // maxWidth: "800px",
//     // minWidth:"400px",
//     backgroundColor: "transparent",
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     // minWidth: "50vw",
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1,
//   },
// }));

// export default function Supervisors(props) {
//   const classes = useStyles();

//   const [filter, setFilter] = useState({
//     status: [],
//     type: [],
//     priority: [],
//   });

//   const [order, setOrder] = React.useState("desc");
//   const [orderBy, setOrderBy] = React.useState("date");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(true);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const [clear, setClear] = React.useState(true);

//   const [hasError, setErrors] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [orignalData, setOrignalData] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [sel, setSel] = React.useState({});
//   const [age, setAge] = React.useState("");

//   const [userData, setUserData] = useState(store.get("userData"));
//   const [supervisor, setSupervisor] = React.useState("");

//   const [supervisors, setSupervisors] = React.useState([]);
//   const handleSupervisorChange = (event) => {
//     setSupervisor(event.target.value);
//   };

//   const handleClickOpen = (row) => {
//     setOpen(true);
//     setSel(row);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const nestedFilter = () => {
//     var filterKeys = Object.keys(filter);
//     return orignalData.filter(function (eachObj) {
//       return filterKeys.every(function (eachKey) {
//         if (!filter[eachKey].length) {
//           return true;
//         }
//         return filter[eachKey].includes(eachObj[eachKey]);
//       });
//     });
//   };

//   // useEffect(() => {
//   //   console.log("length of filter " + filter["status"].length);
//   //   if (
//   //     filter["status"].length > 0 ||
//   //     filter["type"].length > 0 ||
//   //     filter["priority"].length > 0
//   //   ) {
//   //     setClear(false);
//   //   } else {
//   //     setClear(true);
//   //   }
//   //   var filterArray = nestedFilter();

//   //   setRows(filterArray);
//   // }, [filter, orignalData]);
//   const handleLogoutAutomatically = () => {
//     store.remove("userData");
//     store.clearAll();
//     setUserData({});
//     window.location = "/";
//   };
//   // const filterTable = (name, value) => {
//   //   // var filterArray = orignalData;
//   //   if (name == "status") setFilter((filter) => ({ ...filter, status: value }));
//   //   if (name == "priority")
//   //     setFilter((filter) => ({ ...filter, priority: value }));
//   //   if (name == "type") setFilter((filter) => ({ ...filter, type: value }));
//   //   console.log("filterssssssssssss" + JSON.stringify(filter));
//   //   // console.log("ssssssssssssssssssssss item status" + filter);
//   //   // ["status", "priority", "type"].forEach(function (filterBy) {
//   //   //   var filterValue = filter[filterBy];

//   //   //   if (filterValue) {
//   //   //     filterArray = filterArray.filter(function (item) {
//   //   //       console.log("ssssss" + item[filterBy]+ filterValue);
//   //   //       return item[filterBy].trim() == filterValue;
//   //   //     });
//   //   //   }
//   //   //   //  console.log("filter array ssssss" + JSON.stringify(filterArray));
//   //   // });
//   //   // setRows(filterArray);

//   //   // if (name == "All") {
//   //   //   setRows(orignalData);

//   //   //   //if(rows.len)
//   //   // } else setRows(orignalData.filter((item) => item.status == name));
//   // };

// async function fetchData() {
//   var finalObj = [];
//   axios
//     .get("https://m2r31169.herokuapp.com/api/getSuperVisor_Town", {
//       headers: {
//         "x-access-token": userData.accessToken, //the token is a variable which holds the token
//       },
//     })
//     .then((res) => {
//       console.log("supervisor yrrrr" + JSON.stringify(res.data.supervisors[0]));

//       for (var i in res.data.supervisors) {
//         console.log("supervisor" + res.data.supervisors[i]);
//         finalObj.push(res.data.supervisors[i]);
//         // finalObj1.push(res.data.supervisors[i].town);
//       }

//       setSupervisors(finalObj);
//       setRows(finalObj);
//       // setTown(finalObj1);
//     })
//     .catch((err) => {
//       if (err.response) {
//         if (err.response.status === 401 || err.response.status === 403) {
//           handleLogoutAutomatically();
//         }
//       }
//     });
// }

// useEffect(() => {
//   fetchData();
// });
//     // setUnique([...new Set(orignalData.map((item) => item.status))])
//     // console.log("cats" + unique);

//     // axios.get('https://m2r31169.herokuapp.com/api/getComplains')
//     // .then((res) => {setRows(res.data)
//     //   console.log(res.data);})
//     // .catch((err) => setErrors(err));
//   }, []);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     console.log("this is property" + property);
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   return (
// <div className="table">
//   <Grid
//     container
//     justify="flex-start"
//     alignItems="flex-start"
//     marginRight={1}
//   >
//         <Grid item xs={12} sm={12} md={12} lg={12}>
//           {/* <Grid
//             container
//             justify="flex-start"
//             alignItems="flex-start"
//             marginRight={1}
//           >
//             <Grid item xs={12} sm={12} md={12} lg={3}> */}
//           <Paper className="filter" elevation={1}>
//             {/* <Box
//               textAlign="left"
//               color="#008080"
//               fontWeight="600"
//               component="div"
//               fontSize="18"
//             >
//               Filters
//             </Box>
//             <Button
//               disabled={clear}
//               className="clearButton"
//               onClick={() => {
//                 setFilter({
//                   status: [],
//                   type: [],
//                   priority: [],
//                 });
//               }}
//             >
//               Clear All
//             </Button>

//             <SelectFilter
//               key={filter["status"][0]}
//               orignalData={orignalData}
//               label="Status"
//               name="status"
//               value={filter["status"]}
//               filterValue={filterTable}
//             />

//             <SelectFilter
//               key={filter["priority"][0]}
//               orignalData={orignalData}
//               label="Priority"
//               name="priority"
//               value={filter["priority"]}
//               filterValue={filterTable}
//             />

//             <SelectFilter
//               name="type"
//               orignalData={orignalData}
//               label="Complaint Type"
//               value={filter["type"]}
//               key={filter["type"][0]}
//               filterValue={filterTable}
//             /> */}
//             <Scrollbars style={{ minWidth: 100, minHeight: 370 }}>
//               <Paper elevation={1}>
//                 <TableContainer className="tableContainer">
//                   <Table
//                     className={classes.table}
//                     aria-labelledby="tableTitle"
//                     // size={dense ? "small" : "medium"}
//                     size="small"
//                     aria-label="enhanced table"
//                   >
//                     <EnhancedTableHead
//                       classes={classes}
//                       //numSelected={selected.length}
//                       order={order}
//                       orderBy={orderBy}
//                       //onSelectAllClick={handleSelectAllClick}
//                       onRequestSort={handleRequestSort}
//                       rowCount={rows.length}
//                     />

//                     <TableBody className="tableBody">
//                       {stableSort(rows, getComparator(order, orderBy))
//                         .slice(
//                           page * rowsPerPage,
//                           page * rowsPerPage + rowsPerPage
//                         )
//                         .map((row, index) => {
//                           console.log("row name " + row.supervisorId);

//                           const labelId = `enhanced-table-checkbox-${index}`;

//                           return (
//                             <TableRow
//                               className="tableRow"
//                               hover
//                               // onClick={(event) => handleClick(event, row.id)}
//                               //onClick={()=>{handleClickOpen(row)}}
//                               role="checkbox"
//                               tabIndex={-1}
//                               key={row.supervisorId}
//                               //selected={isItemSelected}
//                             >
//                               {/* <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ "aria-labelledby": labelId }}
//                         />
//                       </TableCell> */}

// <TableCell align="left">{row.name}</TableCell>
// <TableCell align="left">{row.email}</TableCell>
// <TableCell align="left">
//   {row.phoneNumber}
// </TableCell>
// <TableCell align="left">{row.town}</TableCell>

// <TableCell align="left">
//   <MoreHorizIcon
//     style={{
//       fontSize: "20px",
//       color: "#8A8A8A",
//     }}
//     onClick={() => handleClickOpen(row)}
//   />
// </TableCell>
//                             </TableRow>
//                           );
//                         })}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Paper>
//             </Scrollbars>
//             {/* <FormControlLabel
//               control={<Switch checked={dense} onChange={handleChangeDense} />}
//               label="Dense padding"
//             /> */}

//             <TablePagination
//               rowsPerPageOptions={[10, 15, 30]}
//               component="div"
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onChangePage={handleChangePage}
//               onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//           </Paper>
//           {/* </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={9}> */}

//           {/* <TablePagination
//             rowsPerPageOptions={[10, 15, 30]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onChangePage={handleChangePage}
//             onChangeRowsPerPage={handleChangeRowsPerPage}
//           /> */}
//           {/* </Grid>
//           </Grid> */}
//         </Grid>
//         {/* <Grid item xs={12} sm={12} md={12} lg={3}>
//           <Grid container> */}
//         {/* <Grid item xs={12} sm={12} md={6} lg={12}>
//               <Visualize
//                 key={orignalData.length}
//                 resolved={
//                   orignalData.filter((obj) => obj.status === "Resolved").length
//                 }
//                 unresolved={
//                   orignalData.filter((obj) => obj.status === "Unresolved")
//                     .length
//                 }
//                 rejected={
//                   orignalData.filter((obj) => obj.status === "Rejected").length
//                 }
//                 assigned={
//                   orignalData.filter((obj) => obj.status === "Assigned").length
//                 }
//                 total={orignalData.length}
//               />
//             </Grid> */}
//         {/* <Grid item xs={12} sm={12} md={6} lg={12}>
//               {" "}
//               <PriorityVisualize
//                 high={
//                   orignalData.filter((obj) => obj.priority == "high").length
//                 }
//                 medium={
//                   orignalData.filter((obj) => obj.priority == "medium").length
//                 }
//                 low={orignalData.filter((obj) => obj.priority == "low").length}
//               />
//             </Grid> */}
//         {/* </Grid>
//         </Grid> */}
//       </Grid>
//     </div>
//   );
// }

// // import React from 'react';

// // function Supervisors(props) {
// //     return (
// //         <div>
// //             <p>Supervisors Page content goes here</p>
// //         </div>
// //     );
// // }

// // export default Supervisors;
