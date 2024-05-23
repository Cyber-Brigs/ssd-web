import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const CoherenceGraph = ({ data }) => (
    
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="no_of_topics" />
      <YAxis dataKey="coherence_value"/>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="coherence_value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

const TopicModellingChart = ({plotData}) => (
    
  <div>
    <CoherenceGraph data={plotData} />
  </div>
);

export default TopicModellingChart;
