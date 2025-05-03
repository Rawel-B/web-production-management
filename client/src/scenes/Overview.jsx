// src/pages/Overview.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  styled,
} from "@mui/material";
import Header from "@/components/Header";
import OverviewChart from "@/components/OverviewChart";
import { useGetSalesStatsQuery } from "@/state/api";

function Overview() {
  const theme = useTheme();
  const [view, setView] = useState("units");
  const { data: stats, isLoading, isError } = useGetSalesStatsQuery();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError)   return <Typography>Error fetching stats</Typography>;

  const StatCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
    },
  }));
  
  const cards = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      isCurrency: true,
    },
    {
      label: "Total Sales",
      value: `${stats.totalSales}`,
      isCurrency: false,
    },
    {
      label: "Inventory Value",
      value: `$${stats.inventoryValue.toFixed(2)}`,
      isCurrency: true,
    },
  ];

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />

      {/* Stats Section */}
      <Box mt="2rem">
        <Grid container spacing={3}>
          {cards.map(({ label, value, isCurrency }) => (
            <Grid item xs={12} sm={4} key={label}>
              <StatCard>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {label}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: isCurrency
                        ? theme.palette.success.main
                        : theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </Typography>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Chart Section */}
      <Box mt="2rem">
        <FormControl sx={{ mt: "1rem" }} size="small">
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        <Box mt="1rem" height="400px">
          <OverviewChart isDashboard view={view} />
        </Box>
      </Box>
    </Box>
  );
}


export default Overview;
