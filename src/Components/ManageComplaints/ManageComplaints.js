import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "../../ComponentsCss/ManageComplaints.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ComplaintTypes from "./Type/ComplaintTypes";
import Rejection from "./ReasonforRejection";
import FeedbackTags from "./FeedbackTags/FeedbackTags";
import { ImpulseSpinner } from "react-spinners-kit";
import Backdrop from "@material-ui/core/Backdrop";

let store = require("store");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  backdrop: {
    zIndex: 100000,
    color: "#fff",
  },
}));

export default function ManageComplaints() {
  const classes = useStyles();
  const theme = useTheme();

  const [userData, setUserData] = useState(store.get("userData"));
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const toggleLoading = (item) => {
    setLoading(item);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          // variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab wrapped label="Complaint Types" {...a11yProps(0)} />
          <Tab wrapped label="Feedback Tags" {...a11yProps(1)} />
          <Tab wrapped label="Reasons for Rejection" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          className="myclass"
          value={value}
          index={0}
          dir={theme.direction}
        >
          {/* <Scrollbars style={{ minWidth: 100, minHeight: 510 }}> */}
          <ComplaintTypes
            token={userData.accessToken}
            loading={toggleLoading}
          />
          {/* </Scrollbars> */}
        </TabPanel>
        <TabPanel
          className="myclass"
          value={value}
          index={1}
          dir={theme.direction}
        >
          {/* <Scrollbars style={{ minWidth: 100, minHeight: 510 }}> */}
          <FeedbackTags token={userData.accessToken} loading={toggleLoading} />
          {/* </Scrollbars> */}
        </TabPanel>
        <TabPanel
          className="myclass"
          value={value}
          index={2}
          dir={theme.direction}
        >
          {" "}
          {/* <Scrollbars style={{ minWidth: 100, minHeight: 510 }}> */}
          <Rejection token={userData.accessToken} loading={toggleLoading} />
          {/* </Scrollbars> */}
        </TabPanel>
      </SwipeableViews>
      <Backdrop className={classes.backdrop} open={loading}>
        <ImpulseSpinner size={90} color="#008081" loading={loading} />
      </Backdrop>
    </div>
  );
}
