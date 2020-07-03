import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Status from "../Status";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectStatus(props) {
  const {
    name,
    value,
    changeValue,
    disable,
    token,

    display,
    otherStatus,
    role,
  } = props;
  const classes = useStyles();

  const [hasError, setErrors] = useState(false);

  const [status, setStatus] = useState([]);
  const [values, setValues] = useState(value);

  const getStatus = () => {
    var finalObj = [];
    axios
      .get("https://m2r31169.herokuapp.com/api/getStatus?Role=" + role, {
        headers: {
          "x-access-token": token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res.data);
        for (var i in res.data) {
          finalObj.push(res.data[i]);
        }
        console.log("Status" + finalObj.toString());
        setStatus(finalObj);
      })
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleChange = (event) => {
    console.log("target valyeeeeeeeeeeee" + event.target.value);
    setValues(event.target.value);
    changeValue(
      event.target.value,
      status.find((x) => x.id === event.target.value).statusType
    );
  };

  return (
    <FormControl className={classes.formControl} style={{ display: display }}>
      <InputLabel id="demo-simple-select-outlined-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={values}
        onChange={handleChange}
        label={props.name}
        disabled={disable}
      >
        {status
          .filter((statusName) =>
            status.find((x) => x.id === value).statusType == "Assigned" ||
            status.find((x) => x.id === value).statusType == "Active"
              ? statusName.statusType != "Unresolved"
              : true
          )
          .filter((statusName) =>
            status.find((x) => x.id === value).statusType == "Assigned" &&
            otherStatus == "Resolved"
              ? statusName.statusType != "Rejected"
              : otherStatus != "Resolved" && role == "ADMIN"
              ? statusName.statusType != "Resolved"
              : true
          )

          .map((statusName) => (
            <MenuItem key={statusName.id} value={statusName.id}>
              <Status name={statusName.statusType} buttonComp="span" />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

SelectStatus.propTypes = {
  name: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,

  changeValue: PropTypes.func.isRequired,
};
