import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const SrsUploadsChart = ({ plotData }) => {
  return (
    <div>
      {" "}
      <BarChart
        width={420}
        height={250}
        data={plotData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" className="text-[6px]" />
        <YAxis dataKey="number_Of_uploads" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="number_Of_uploads"
          fill="#089BD9"
          activeBar={<Rectangle fill="#00588C" />}
        />
      </BarChart>
    </div>
  );
};

export default SrsUploadsChart;
