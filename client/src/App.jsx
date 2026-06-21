import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/Dashboard";
import Orders from "./scenes/Orders";
import Products from "./scenes/Products";
import Stocks from "./scenes/Stocks";
import Workers from "./scenes/Workers";
import Support from "./scenes/Support";
import Geography from "./scenes/Geography";
import Overview from "./scenes/Overview";
import Daily from "./scenes/Daily";
import Monthly from "./scenes/Monthly";
import Breakdown from "./scenes/Breakdown";
import Admin from "./scenes/Admin";
import Performance from "./scenes/Performance";
import Login from "./scenes/Login";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/breakdown" element={<Breakdown />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/performance" element={<Performance />} />
        </Route>
      </Route>
      
      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </>
  )
);

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
