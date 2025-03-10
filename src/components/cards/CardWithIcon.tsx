import { TrendingUp } from "lucide-react";
import { Card } from "../ui/card";

interface Props {
  id: number;
  name: string;
  count: string;
  rate: string;
  icon: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "destructive"
    | "default"
    | "dark";
}

export function CardWithIcon({ count, icon, id, name, rate, color }: Props) {
  return (
    <Card className="rounded-lg w-full p-4 xl:p-2 xl:py-6 2xl:p-6  flex flex-col items-center 2xl:min-w-[168px]">
      <div>
        <span
          className={`h-12 w-12 rounded-full flex justify-center items-center bg-${color}/10`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-4 text-center">
        <div className="text-base font-medium text-default-600">{name}</div>
        <div className={`text-3xl font-semibold text-${color} mt-1`}>
          {count}
        </div>
        <div className="flex items-center gap-1 mt-2.5">
          <span className="text-xs xl:text-sm font-medium text-default-600 whitespace-nowrap">
            Project Progress
          </span>
          <span className="text-xs xl:text-sm font-medium text-success">
            +{rate}
          </span>
          <TrendingUp className="h-[14px] w-[14px] text-success/90" />
        </div>
      </div>
    </Card>
  );
}
