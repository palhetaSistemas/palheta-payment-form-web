"use client";
import { themes } from "@/src/config/thems";
import { getGridConfig } from "@/src/lib/appex-chart-options";
import { useThemeStore } from "@/src/store";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  series: {
    data: number[];
  }[];
  categories: string[];
  colors?: string[];
}

export function BarChartWithDropdown({
  height = 160,
  series,
  colors,
  categories,
}: Props) {
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
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig("#85888C"),
    yaxis: {
      show: false,
    },
    bar: {
      columnWidth: "100%",
      barHeight: "100%",
    },
    xaxis: {
      categories,
      labels: {
        show: true,
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
            height: 225,
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
    <Card className=" h-full">
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1 flex-col lg:flex-row">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900">
              Titulo um pouco maior para testar responsividade
            </div>
            <span className="text-xs text-default-600 ml-1">subtitle</span>
          </div>
          <div className="flex-none flex-col xl:flex-row flex items-center gap-1 ">
            <Select>
              <SelectTrigger className="w-[160px] border-default-900 text-default-900">
                <SelectValue
                  placeholder="Selecionar Ano"
                  className="whitespace-nowrap bg-red-500"
                />
              </SelectTrigger>
              <SelectContent className=" ">
                <SelectItem value="jan-12">Jan 12</SelectItem>
                <SelectItem value="jan-13">Jan 13</SelectItem>
                <SelectItem value="jan-14">Jan 14</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px] border-default-900 text-default-900">
                <SelectValue
                  placeholder="Selecionar Mês"
                  className="whitespace-nowrap"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-12">Jan 12</SelectItem>
                <SelectItem value="jan-13">Jan 13</SelectItem>
                <SelectItem value="jan-14">Jan 14</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0 ">
        <Chart options={options} series={series} type="bar" />
      </CardContent>
    </Card>
  );
}
