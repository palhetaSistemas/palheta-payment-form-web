"use client";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Icon } from "@iconify/react";
import ChartTable from "./chartTable";
import TableChart from "./tableChart";
interface Props {
  title: string;
  subtitle: string;
  chartTitle: string;
  height?: number;
  indicator?: boolean;
  tableData: {
    headers: string[];
    content: string[][];
  };
  colors?: string[];
  chartData: {
    series: {
      data: number[];
    }[];
    categories: string[];
  };
}

const ChartWithTable = ({
  chartData,
  chartTitle,
  subtitle,
  tableData,
  title,
  colors,
  height,
  indicator,
}: Props) => {
  return (
    <Card className=" h-full ">
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900">
              Animais por Raça
            </div>
            <span className="text-xs text-default-600 ml-1">
              Últimos 30 dias
            </span>
          </div>
          <div className="flex-none flex items-center gap-1">
            <span className="text-4xl font-semibold text-primary">1200</span>
            <span className="text-2xl text-success">
              <Icon icon="heroicons:arrow-trending-up-16-solid" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0 ">
        <TableChart
          height={height}
          colors={colors}
          categories={chartData.categories}
          series={chartData.series}
        />
        <ChartTable content={tableData.content} headers={tableData.headers} />
      </CardContent>
    </Card>
  );
};

export default ChartWithTable;
