"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/src/store";
import { useTheme } from "next-themes";
import { themes } from "@/src/config/thems";
import { getGridConfig } from "@/src/lib/appex-chart-options";

interface Props {
  height?: number;
  series: {
    data: number[];
  }[];
  colors?: string[];
  categories: string[];
}

const TableChart = ({ height = 160, series, categories, colors }: Props) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
      width: 0,
    },
    colors: colors || ["#8F1220"],
    yaxis: {
      show: false,
    },
    bar: {
      columnWidth: "100%",
      barHeight: "100%",
    },
    grid: getGridConfig("#85888C"),
    xaxis: {
      categories,
      labels: {
        show: true,
        style: {
          colors: mode === "dark" ? "#fff" : "#000",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default TableChart;
