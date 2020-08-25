import PieChart from "react-minimal-pie-chart";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export default function PriorityVisualize(props) {
  return (
    <Paper className="visualize elevationPaper">
      <Box
        textAlign="left"
        color="#008080"
        fontWeight="600"
        component="div"
        fontSize="18"
      >
        Priority
      </Box>

      <PieChart
        style={{
          height: "160px ",
        }}
        radius={50}
        labelPosition={50}
        data={[
          { title: "High", value: props.high, color: "red" },
          { title: "Medium", value: props.medium, color: "orange" },
          { title: "Low", value: props.low, color: "rgba(251, 179, 26, 0.33)" },
        ]}
      />
      <Box
        textAlign="left"
        color="rgba(251, 179, 26, 0.33)"
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
        Low
      </Box>
      <Box
        textAlign="left"
        color="orange"
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
        Medium
      </Box>
      <Box
        textAlign="left"
        color="red"
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
        High
      </Box>
    </Paper>
  );
}
