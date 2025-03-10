export const getYAxisConfig = (
  color: string
): { labels: { style: { color: string; fontFamily: string } } } => ({
  labels: {
    style: {
      color: color,
      fontFamily: "Inter",
    },
  },
});

export const getXAxisConfig = (colors: string): {} => ({
  categories: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Maio",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dec",
  ],
  labels: getLabel(colors),
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  },
});

export const getLabel = (colors: any): {} => ({
  style: {
    colors: colors,
    fontFamily: "Inter",
  },
});

export const getGridConfig = (
  color: string
): {
  show: boolean;
  borderColor: string;
  strokeDashArray: number;
  position: string;
} => ({
  show: true,
  borderColor: color,
  strokeDashArray: 10,
  position: "back",
});
