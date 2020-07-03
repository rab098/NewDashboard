import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ChartistGraph from "react-chartist";
import Box from "@material-ui/core/Box";
import "../../ComponentsCss/resolveTimeAnalysis.css";

let Chartist = require("chartist");

function ResolveTimeAnalysisStats() {
  const [resolveTime, setResolveTime] = useState({
    less: 70,
    medium: 20,
    high: 10,
  });

  useEffect(() => {
    axios
      .get("https://m2r31169.herokuapp.com/api/getresolveTime")
      .then((res) => {
        console.log("resolveTime coming", res.data);
        if (
          res.data._1_to_9 !== null &&
          res.data._10_to_16 !== null &&
          res.data._17_to_24 !== null
        ) {
          setResolveTime({
            less: res.data._1_to_9,
            medium: res.data._10_to_16,
            high: res.data._17_to_24,
          });
        } else
          setResolveTime({
            less: 0,
            medium: 0,
            high: 0,
          });
      })
      .catch((err) => console.error(err));
  }, []);

  const piechart = {
    data: {
      series: [resolveTime.high, resolveTime.less, resolveTime.medium],
    },
    options: {
      labelInterpolationFnc: function (value) {
        if (value === 0) return "";
        else return value + "%";
      },
    },
  };

  return (
    <div className="resolve-main">
      <ChartistGraph
        data={piechart.data}
        type="Pie"
        options={piechart.options}
        style={{ padding: "10px" }}
      />

      <div className="resolve-heading">
        <p className="resolve-text">Resolve Time Analysis</p>
      </div>

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
        color="#008081"
        fontWeight="600"
        component="span"
        fontSize="0.75rem"
      >
        {" "}
        1 to 9 hours
      </Box>
      <Box
        textAlign="left"
        color=" #f4c63d"
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
        10 to 16 hours
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
        17 to 24 hours
      </Box>
    </div>
  );
}

export default ResolveTimeAnalysisStats;
