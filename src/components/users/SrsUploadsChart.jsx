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
        width={700}
        height={400}
        data={plotData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" className="text-[8px]" />
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
