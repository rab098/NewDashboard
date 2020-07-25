import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "../../ComponentsCss/FeedbackStats.css";
import ChartistGraph from "react-chartist";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

let Chartist = require("chartist");
let store = require("store");

function FeedbackStats(props) {
  const [userData, setUserData] = useState(store.get("userData"));

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": userData.accessToken,
  };

  const [checkFeedback, setCheckFeedback] = useState(0);

  const [feedback, setFeedback] = useState({
    positive: 80,
    neg: 20,
  });

  const handleLogoutAutomatically = () => {
    store.remove("userData");
    store.clearAll();
    setUserData({});
    window.location = "/";
  };

  useEffect(() => {
    axios
      .get("https://m2r31169.herokuapp.com/api/getFeedbacks", {
        headers: headers,
      })
      .then((res) => {
        console.log("feedbacks coming", res.data);

        if (
          res.data.Feedback[0].postive !== null &&
          res.data.Feedback[1].negative !== null
        )
          setFeedback({
            positive: res.data.Feedback[0].postive,
            neg: res.data.Feedback[1].negative,
          });
        else {
          setCheckFeedback(1);
          setFeedback({
            positive: 0,
            neg: 0,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            handleLogoutAutomatically();
          }
        }
        console.error(err);
      });
  }, []);

  const piechart = {
    data: {
      series: [feedback.neg, feedback.positive],
    },
    options: {
      labelInterpolationFnc: function (value) {
        return value + "%";
      },
    },
  };

  // const piechart = {
  //     data:{
  //         series: [feedback.positive,feedback.negative]
  //         // series:[feedback[0].positive,feedback[1].negative]
  //     },
  //     options:{
  //         donut: true
  //     },
  //     animation:{
  //         draw: function (data){
  //             if(data.type === 'slice'){
  //                 // Get the total path length in order to use for dash array animation
  //                 let pathLength = data.element._node.getTotalLength();
  //
  //                 // Set a dasharray that matches the path length as prerequisite to animate dashoffset
  //                 data.element.attr({
  //                     'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
  //                 });
  //
  //                 // Create animation definition while also assigning an ID to the animation for later sync usage
  //                 let animationDefinition = {
  //                     'stroke-dashoffset': {
  //                         id: 'anim' + data.index,
  //                         dur: 1000,
  //                         from: -pathLength + 'px',
  //                         to:  '0px',
  //                         easing: Chartist.Svg.Easing.easeOutQuint,
  //                         // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
  //                         fill: 'freeze'
  //                     }
  //                 };
  //
  //                 // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
  //                 if(data.index !== 0) {
  //                     animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
  //                 }
  //
  //                 // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
  //                 data.element.attr({
  //                     'stroke-dashoffset': -pathLength + 'px'
  //                 });
  //
  //                 // We can't use guided mode as the animations need to rely on setting begin manually
  //                 // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
  //                 data.element.animate(animationDefinition, false);
  //
  //             }
  //         }
  //     }
  // }

  return (
    <div
      className={
        props.role === "ADMIN" ? "feedback-main" : "feedback-main-hidden"
      }
    >
      {checkFeedback === 0 ? (
        <ChartistGraph
          data={piechart.data}
          type="Pie"
          options={piechart.options}
          style={{ padding: "10px" }}
        />
      ) : (
        <div className="no-resolve-time-heading">
          <p className="resolve-text">Not available</p>
        </div>
      )}
      {/*<ChartistGraph*/}
      {/*  data={piechart.data}*/}
      {/*  type="Pie"*/}
      {/*  options={piechart.options}*/}
      {/*  style={{ padding: "10px" }}*/}
      {/*/>*/}

      <div className="feedback-heading">
        <p className="feedback-text">Feedback Summary</p>

        <Box
          textAlign="left"
          color="#43a047"
          fontWeight="bold"
          component="span"
          fontSize="3rem"
        >
          .
        </Box>

        <Box
          textAlign="left"
          color="#008080"
          fontWeight="600"
          component="span"
          fontSize="0.75rem"
        >
          {" "}
          Positive
        </Box>

        <Box
          textAlign="left"
          color="#fb8c00"
          fontWeight="bold"
          component="span"
          fontSize="3rem"
          marginLeft={1}
        >
          .
        </Box>

        <Box
          textAlign="left"
          color="#008080"
          fontWeight="600"
          component="span"
          fontSize="0.75rem"
        >
          {" "}
          Negative
        </Box>
      </div>
    </div>
  );
}

export default FeedbackStats;
