"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/src/store";
import { useTheme } from "next-themes";
import { themes } from "@/src/config/thems";

import { getGridConfig } from "@/src/lib/appex-chart-options";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Icon } from "@iconify/react";

interface Props {
  height?: number;
  colors?: string[];
}

const LineChart = ({ height = 360, colors }: Props) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Completed Task",
      data: [45, 52, 38, 24, 33, 40],
    },
  ];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [4],
      curve: "straight",
    },
    colors: colors || ["#8F1220"],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    markers: {
      size: 4,
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inter",
          colors: `hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`,
        },
      },
    },
    yaxis: {
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inter",
          colors: [
            `hsl(${
              theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
            })`,
          ],
        },
      },
    },
    legend: {
      show: false,
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
    responsive: [
      // {
      //   breakpoint: 1024,
      //   options: {
      //     chart: {
      //       height: 200,
      //     },
      //   },
      // },
      // {
      //   breakpoint: 1360,
      //   options: {
      //     chart: {
      //       height: 150,
      //     },
      //   },
      // },
      // {
      //   breakpoint: 1440,
      //   options: {
      //     chart: {
      //       height: 150,
      //     },
      //   },
      // },
      {
        breakpoint: 1920,
        options: {
          chart: {
            height: 325,
          },
        },
      },
      // {
      //   breakpoint: 2560,
      //   options: {
      //     chart: {
      //       height: 200,
      //     },
      //   },
      // },
      // {
      //   breakpoint: 2561,
      //   options: {
      //     chart: {
      //       height: 250,
      //     },
      //   },
      // },
    ],
  };
  return (
    <Card>
      <CardHeader className="mb-0 border-none pt-6 pl-7 pb-0 flex-row flex-wrap items-center justify-between gap-4">
        <CardTitle className="whitespace-nowrap">Report Chart</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Chart options={options} series={series} type="line" />
      </CardContent>
    </Card>
  );
};

export default LineChart;
