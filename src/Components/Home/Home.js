import React, { useState, useEffect } from "react";
import axios from "axios";
import Charts from "../Home/Charts";
import Zone from "./ZoneStats";
import FeedbackStats from "./FeedbackStats";
import ResolveTimeAnalysisStats from "./ResolveTimeAnalysisStats";
import { Scrollbars } from "react-custom-scrollbars";
import ChartistGraph from "react-chartist";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import DoneIcon from "@material-ui/icons/Done";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import ClearIcon from "@material-ui/icons/Clear";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import UpdateIcon from "@material-ui/icons/Update";
import { makeStyles } from "@material-ui/core/styles";
import { grayColor } from "../../assets/jss/material-dashboard-react";
import "../../assets/css/charts-and-graphs.css";
import "../../ComponentsCss/Home.css";
import Backdrop from "@material-ui/core/Backdrop";
import {ImpulseSpinner} from "react-spinners-kit";

let store = require("store");

const styles = {
  stats: {
    borderTop: "1px solid #99999957",
    paddingTop: "5px",
    color: "#999",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    fontSize: "12px",
    lineHeight: "22px",
  },
    backdrop: {
        zIndex: 1,
        color: "#fff",
    },
};

const useStyles = makeStyles(styles);

function Home(props) {
  // window.addEventListener('storage', function (e) {
  //     if (e.key === 'logoutEvent') {
  //         window.location = "/"
  //         console.log('logout hogya ballay ballay')
  //     }
  // });

  const [userData, setUserData] = useState(store.get("userData"));
  const [loading, setLoading] = useState(true);


    const [grid, setGrid] = useState(5);

  console.log("store?????", userData);

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": userData.accessToken,
  };

  const classes = useStyles();

  const handleLogoutAutomatically = () => {
    store.remove("userData");
    store.clearAll();
    setUserData({});
    window.location = "/";
  };

  const [count, setCount] = useState({
    totalComplaints: "0",
    resolvedComplaints: "0",
    unresolvedComplaints: "0",
    assignedComplaints: "0",
    supervisors: "0",
    activeComplaints: "0",
    pending: "0",
    rejectedComplaints: "0",
  });

  const [chartType, setChartType] = useState("Total Complaints");

  const [lastUpdatedState, setLastUpdated] = useState({
    Complaints: "00:00",
    Resolved: "00:00",
    Assigned: "00:00",
    Rejected: "00:00",
    Unresolved: "00:00",
    Supervisors: "00:00",
  });

  const [counts, setCounts] = useState({
    Active: 0,
    Assigned: 0,
    Rejected: 0,
    Resolved: 0,
    Supervisors: 0,
    TotalComplaints: 0,
    Unresolved: 0,
    Pending: 0,
  });

  const handleChange = (event) => {
    event.preventDefault();

    let type = event.target.value;

    if (type === "Total Complaints") {
      setChartType(type);
    } else if (type === "Resolved") {
      setChartType(type);
    } else if (type === "Unresolved") {
      setChartType(type);
    } else if (type === "Assigned") {
      setChartType(type);
    } else if (type === "Rejected") {
      setChartType(type);
    }
  };

  const getHomeData = () => {
    if (userData.accessToken !== null) {
      axios
        .get("https://m2r31169.herokuapp.com/api/getTotalSupervisorsAndComplaintsCountAndLastUpdatedTime", {
          headers: headers,
        })
        .then((res) => {
          // if(res.status === 401){
          //     window.location = `/`
          // }
          // else

          console.log("update time", res.data);
          setCounts(res.data.Count);
          setLastUpdated(res.data.LastUpdated);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401 || err.response.status === 403) {
              handleLogoutAutomatically();
            } else if (
              err.response.status === 503 ||
              err.response.status === 500
            ) {
              console.log(err.response.status);
              setLoading(false)
              props.handleError(err.response.status);
            }
          }
          console.error(err);
        });
    }
  };

  // const getCount = () => {
  //   if (userData.accessToken !== null) {
  //     axios
  //       .get(
  //         "https://m2r31169.herokuapp.com/api/totalSuervisorsAndComplaintsCount",
  //         { headers: headers }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //
  //         setCounts(res.data);
  //
  //         // setCount({
  //         //     totalComplaints: res.data[0].Count,
  //         //     resolvedComplaints: res.data[1].Count,
  //         //     unresolvedComplaints: res.data[2].Count,
  //         //     assignedComplaints: res.data[3].Count,
  //         //     rejectedComplaints: res.data[4].Count,
  //         //     activeComplaints: res.data[5].Count,
  //         //     supervisors: res.data[6].Count,
  //         // });
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           if (err.response.status === 401 || err.response.status === 403) {
  //             handleLogoutAutomatically();
  //           } else if (
  //             err.response.status === 503 ||
  //             err.response.status === 500
  //           ) {
  //             console.log(err.response.status);
  //           }
  //         }
  //         console.error(err);
  //       });
  //   }
  // };

  useEffect(() => {
      getHomeData()
  }, []);

  return (
    //new home layout
    // style={{
    //                 gridTemplateColumns: `repeat(${grid},1fr)`
    //             }}
    <div className="home-grid">
      <div className="counts">
        <div className="total-complaints">
          <AssignmentRoundedIcon
            style={{
              float: "left",
              marginTop: "-20px",
              background: "linear-gradient(60deg, #26c6da, #00acc1)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              position: "absolute",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)",
            }}
          />
          <p className="count-title">Complaints</p>
          <p className="count-value">{counts.TotalComplaints}</p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Complaints}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Complaints.updatedAt}*/}
          </div>
        </div>
        <div className="total-resolved-complaints">
          <DoneIcon
            style={{
              float: "left",
              marginTop: "-20px",
              background: "linear-gradient(60deg, #66bb6a, #43a047)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              position: "absolute",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
            }}
          />
          <p className="count-title">Resolved</p>
          <p className="count-value">{counts.Resolved}</p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Resolved}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Resolved[0].updatedAt}*/}
          </div>
        </div>
        <div className="total-assigned-complaints">
          <HourglassFullIcon
            style={{
              float: "left",
              marginTop: "-20px",
              background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              position: "absolute",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
            }}
          />
          <p className="count-title">
            {userData.Role === "ADMIN" ? "Assigned" : "Active"}
          </p>
          <p className="count-value">
            {userData.Role === "ADMIN" ? counts.Assigned : counts.Active}
          </p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Assigned}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Assigned[0].updatedAt}*/}
          </div>
        </div>
        <div className="total-unresolved">
          <ClearIcon
            style={{
              float: "left",
              marginTop: "-20px",
              background: "linear-gradient(60deg, #ef5350, #e53935)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              position: "absolute",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(244, 67, 54,.4)",
            }}
          />
          <p className="count-title">Unresolved</p>
          <p className="count-value">{counts.Unresolved}</p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Unresolved}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Unresolved[0].updatedAt}*/}
          </div>
        </div>
        <div className="total-rejected-complaints ">
          <PriorityHighIcon
            style={{
              float: "left",
              marginTop: "-20px",
              background: "linear-gradient(60deg, #ffa726, #fb8c00)",
              borderRadius: "5px",
              color: "white",
              width: "30px",
              height: "30px",
              padding: "10px",
              position: "absolute",
              boxShadow:
                "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4)",
            }}
          />
          <p className="count-title">Rejected </p>
          <p className="count-value">{counts.Rejected}</p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Rejected}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Rejected[0].updatedAt}*/}
          </div>
        </div>
        <div className="total-supervisors">
          {userData.Role === "ADMIN" ? (
            <SupervisorAccountRoundedIcon
              style={{
                float: "left",
                marginTop: "-20px",
                background: "linear-gradient(60deg,#FFEE75,#FFDF00)",
                borderRadius: "5px",
                color: "white",
                width: "30px",
                height: "30px",
                padding: "10px",
                position: "absolute",
                boxShadow:
                  "rgba(0, 0, 0, 0.14) 0px 4px 20px 0px, rgba(234, 212, 56, 0.64) 0px 7px 10px -5px",
              }}
            />
          ) : (
            <AccessTimeIcon
              style={{
                float: "left",
                marginTop: "-20px",
                background: "linear-gradient(60deg,#FFEE75,#FFDF00)",
                borderRadius: "5px",
                color: "white",
                width: "30px",
                height: "30px",
                padding: "10px",
                position: "absolute",
                boxShadow:
                  "rgba(0, 0, 0, 0.14) 0px 4px 20px 0px, rgba(234, 212, 56, 0.64) 0px 7px 10px -5px",
              }}
            />
          )}
          <p className="count-title">
            {userData.Role === "ADMIN" ? "Supervisors" : "Pending"}
          </p>
          <p className="count-value">
            {userData.Role === "ADMIN" ? counts.Supervisors : counts.Pending}
          </p>
          <div className={classes.stats}>
            <UpdateIcon fontSize="small" /> Last updated{" "}
            {lastUpdatedState.Supervisors}
            {/*{Object.keys(sendingTime).length > 0 &&*/}
            {/*sendingTime.Supervisors[0].updatedAt}*/}
          </div>
        </div>
      </div>
      <div className="select-dropdown">
        <p>Filter charts by : </p>
        <select defaultValue="Total Complaints" onChange={handleChange}>
          <option value="Total Complaints">Total Complaints</option>
          <option value="Resolved">Resolved</option>
          <option value="Unresolved">Unresolved</option>
          <option value="Assigned">Assigned</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Charts value={chartType} />
        {userData.Role === "ADMIN" && <Zone /> }
      <div className="table-and-piechart">
        {userData.Role === "ADMIN" && <FeedbackStats role={userData.Role} />}
        <ResolveTimeAnalysisStats />
      </div>

        <Backdrop className={classes.backdrop} open={loading}>
            <ImpulseSpinner size={90} color="#008081" />
        </Backdrop>

    </div>

    //old home layout
    // <div>
    //
    //         <Grid container className={classes.paperContainer}>
    //             <Grid item className={classes.gridItem} xs={2}>
    //
    //                 <Paper>
    //                     Total Complaints
    //                 </Paper>
    //             </Grid>
    //         </Grid>
    //         <Grid container className={classes.gridContainer}>
    //             <Grid item className={classes.gridItem} xs={4}>
    //                 <Card className={classes.cardChart}>
    //                     <ChartistGraph
    //                         className="ct-chart-background-daily-complaints"
    //                         data={dailySalesChart.data}
    //                         type="Line"
    //                         options={dailySalesChart.options}
    //                         listener={dailySalesChart.animation}
    //                     />
    //                     <div className={classes.line}>
    //                         <p>Daily Complaints</p>
    //                     </div>
    //                     <div className={classes.stats}>
    //                         <AccessTimeIcon fontSize={"small"}/> updated 4 minutes ago
    //                     </div>
    //                 </Card>
    //             </Grid>
    //             <Grid item className={classes.gridItem} xs={4}>
    //                 <Card className={classes.cardChart} color="danger">
    //                     <ChartistGraph
    //                         className="ct-chart-background-monthly-complaints"
    //                         data={emailsSubscriptionChart.data}
    //                         type="Bar"
    //                         options={emailsSubscriptionChart.options}
    //                         responsiveOptions={emailsSubscriptionChart.responsiveOptions}
    //                         listener={emailsSubscriptionChart.animation}
    //                     />
    //                     <div className={classes.line}>
    //                         <p>Monthly Complaints</p>
    //                     </div>
    //                     <div className={classes.stats}>
    //                         <AccessTimeIcon fontSize={"small"}/> updated 4 minutes ago
    //                     </div>
    //                 </Card>
    //             </Grid>
    //             <Grid item className={classes.gridItem} xs={4}>
    //                 <Card className={classes.cardChart}>
    //                     <ChartistGraph
    //                         className="ct-chart-background-resolved-complaints"
    //                         data={completedTasksChart.data}
    //                         type="Line"
    //                         options={completedTasksChart.options}
    //                         listener={completedTasksChart.animation}
    //                     />
    //                     <div className={classes.line}>
    //                         <p>Resolved Complaints</p>
    //                     </div>
    //                     <div className={classes.stats}>
    //                         <AccessTimeIcon fontSize={"small"}/> updated 4 minutes ago
    //                     </div>
    //                 </Card>
    //             </Grid>
    //         </Grid>
    // </div>
  );
}

export default React.memo(Home);
// export default Home
