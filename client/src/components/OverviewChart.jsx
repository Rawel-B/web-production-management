/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, Typography } from "@mui/material";
import { useGetSalesStatsQuery } from "@/state/api";
import { useGetSalesQuery } from "@/state/api";

function OverviewChart({ isDashboard = false, view }) {
  const theme = useTheme();
  const { data: allSales = [], isLoading, isError } = useGetSalesQuery();
  // const { data: rawData, isLoading, isError } = useGetSalesStatsQuery();

  // const allSales = useMemo(() => {
  //   if (Array.isArray(rawData)) return rawData;
  //   if (rawData && Array.isArray(rawData.sales)) return rawData.sales;
  //   return [];
  // }, [rawData]);

  console.log("all sales :", allSales);

  const monthly = useMemo(() => {
    return allSales.reduce((acc, { saleDate, price, quantity }) => {
      const d = new Date(saleDate);
      const key = `${d.toLocaleString("default", { month: "short" })}-${d.getFullYear()}`;
      if (!acc[key]) acc[key] = { month: key, totalSales: 0, totalUnits: 0 };
      acc[key].totalSales += price * quantity;
      acc[key].totalUnits += quantity;
      return acc;
    }, {});
  }, [allSales]);

  console.log("monthly data :", monthly);

  const [salesSeries, unitsSeries] = useMemo(() => {
    const sorted = Object.values(monthly).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );
    let cumSales = 0,
      cumUnits = 0;
    const salesData = [],
      unitsData = [];
    sorted.forEach(({ month, totalSales, totalUnits }) => {
      cumSales += totalSales;
      cumUnits += totalUnits;
      salesData.push({ x: month, y: cumSales });
      unitsData.push({ x: month, y: cumUnits });
    });
    return [
      [{ id: "Revenue", color: theme.palette.secondary.main, data: salesData }],
      [{ id: "Units",   color: theme.palette.secondary[600],   data: unitsData }],
    ];
  }, [monthly, theme.palette.secondary]);

  console.log("sales series :", salesSeries, unitsSeries);

  if (isLoading) return <Typography>Loading…</Typography>;

  return (
    <ResponsiveLine
      data={view === "sales" ? salesSeries : unitsSeries}
      theme={{
        axis: {
          domain: { line: { stroke: theme.palette.secondary[200] } },
          ticks: {
            line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
            text: { fill: theme.palette.secondary[200] },
          },
          legend: { text: { fill: theme.palette.secondary[200] } },
        },
        legends: { text: { fill: theme.palette.secondary[200] } },
        tooltip: { container: { color: theme.palette.grey[700] } },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => (isDashboard ? v.slice(0, 3) : v),
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        legend: isDashboard ? "" : view === "sales" ? "Revenue" : "Units",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      useMesh
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 30,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
              },
            ]
          : undefined
      }
    />
  );
}

export default OverviewChart;
