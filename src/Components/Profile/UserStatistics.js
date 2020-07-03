import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { flexbox } from "@material-ui/system";
import axios from "axios";
import DoneIcon from "@material-ui/icons/Done";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import ClearIcon from "@material-ui/icons/Clear";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

export default function UserStatistics(props) {
  const [statistics, setStatistics] = useState({});
  const getStatistics = () => {
    axios
      .get("https://m2r31169.herokuapp.com/api/statstics", {
        headers: {
          "x-access-token": props.token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log("statistics" + res.data);
        setStatistics(res.data.statistics);
      })
      .catch((err) => console.log("Error in statistics" + err));
  };

  useEffect(() => {
    getStatistics();
  }, []);
  return (
    <Box>
      <Box margin={1} style={{ textAlign: "center" }} fontWeight="500">
        Statistics
      </Box>
      <Box
        display="flex"
        // justifyContent="center"
        //  className="elevation"
      >
        <Box className="list" display="flex">
          <DoneIcon
            style={{
              float: "left",

              background: "linear-gradient(60deg, #66bb6a, #43a047)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
            }}
          />
          <Details title="Resolved" name={statistics.Resolved} />
        </Box>
        <Box className="list" display="flex">
          <HourglassFullIcon
            style={{
              float: "left",

              background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",

              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
            }}
          />
          {props.role == "ADMIN" ? (
            <Details title="Assigned" name={statistics.Assigned} />
          ) : (
            <Details title="Active" name={statistics.Active} />
          )}
        </Box>
        <Box className="list" display="flex">
          <Box>
            <PriorityHighIcon
              style={{
                float: "left",

                background: "linear-gradient(60deg, #ffa726, #fb8c00)",
                borderRadius: "5px",
                color: "white",
                width: "30px",
                height: "30px",
                padding: "10px",

                boxShadow:
                  "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)",
              }}
            />
          </Box>
          <Details title="Rejected" name={statistics.Rejected} />
        </Box>
      </Box>
    </Box>
  );
}

function Details(props) {
  return (
    <Box style={{ marginLeft: "1rem" }}>
      <Box fontWeight="500" fontSize="2rem" color="grey">
        {props.name}
      </Box>
      <Box fontSize="0.7rem" color="black">
        {props.title}
      </Box>
    </Box>
  );
}
