import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useMemo } from "react";
import { Line, Bar, Scatter } from "react-chartjs-2";

import { trpc } from "../services/trpc.js";

export type GraphType = "line" | "bar" | "scatter";

export interface CustomResourceGraphProps {
  graphType: GraphType;
  handlerPath: string;
}

export const CustomResourceGraph = ({
  graphType,
  handlerPath,
}: CustomResourceGraphProps) => {
  const chartData = trpc["uiGraph.getData"].useQuery({
    resourcePath: handlerPath,
  });

  const labels = useMemo(() => {
    if (!chartData.data) {
      return;
    }

    return chartData.data.map((item) => {
      const date = new Date(item.timestamp._date);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });
  }, [chartData.data]);

  const parsedData = useMemo(() => {
    if (!chartData.data) {
      return;
    }

    return chartData.data.map((item) => {
      return {
        x: new Date(item.timestamp._date),
        y: item.value,
      };
    });
  }, [chartData.data]);

  Chart.register(CategoryScale);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: parsedData,
      },
    ],
  };
  return (
    <>
      {graphType === "line" && <Line options={options} data={data} />}
      {graphType === "bar" && <Bar options={options} data={data} />}
      {graphType === "scatter" && <Scatter options={options} data={data} />}
    </>
  );
};
