import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SrsUploadsChart = () => {
  const [hackathons, setHackathons] = useState({});

  return (
    <div>
      {" "}
      <BarChart
        width={700}
        height={400}
        data={hackathons}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-[8px]" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="date"
          fill="#089BD9"
          activeBar={<Rectangle fill="#00588C" />}
        />
      </BarChart>
    </div>
  );
};

export default SrsUploadsChart;
