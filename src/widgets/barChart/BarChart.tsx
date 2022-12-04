import "./barChart.scss";
import { useEffect, useState } from "react";
import Model from "./model";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  model: Model;
  title: string;
  name: string;
  yAxisDataKey: string;
  barDataKey: string;
}

const BarChart = ({
  model,
  title,
  yAxisDataKey,
  barDataKey,
  name,
}: BarChartProps) => {
  const [data, setData] = useState<any[]>([]);

  const populate = async () => {
    const newData = await model.provide();
    setData(newData);
  };

  useEffect(() => {
    populate();
  }, []);

  return (
    <div className="barChart">
      <h1 className="title">{title}</h1>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            width={600}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 40,
            }}
          >
            <XAxis type="number" />
            <YAxis dataKey={yAxisDataKey} type="category" scale="band" />
            <Tooltip />
            <Legend />
            <Bar dataKey={barDataKey} barSize={20} name={name} fill="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
