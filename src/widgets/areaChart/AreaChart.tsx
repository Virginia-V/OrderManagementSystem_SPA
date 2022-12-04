import "./chart.scss";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { useEffect, useState } from "react";
import Model from "./model";
import LocalizedText from "../../services/LocalizationService";

interface ChartProps {
  model: Model;
  title: string;
  name: string;
  xAxisDataKey: string;
  areaDataKey: string;
}

const Chart = ({
  model,
  title,
  xAxisDataKey,
  areaDataKey,
  name,
}: ChartProps) => {
  const [data, setData] = useState<any[]>([]);

  const populate = async () => {
    const newData = await model.provide();
    setData(newData);
  };

  useEffect(() => {
    document.addEventListener("languageChanged", languageChangedHandler);
    populate();
    return () =>
      document.removeEventListener("languageChanged", languageChangedHandler);
  }, []);

  const languageChangedHandler = (e: any) => {
    setData((x) => {
      const translatedItems = x.map((v, i) => {
        const newItem = {
          sales: v.sales,
          category: LocalizedText.SalesChart[i],
        };
        return newItem;
      });
      return translatedItems;
    });
  };

  return (
    <div className="chart">
      <h1 className="title">{title}</h1>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip />
            <Area
              name={name}
              type="monotone"
              dataKey={areaDataKey}
              stroke="#8884d8"
              fill="#8884d8"
            />    
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
