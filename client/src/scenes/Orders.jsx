/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Header from "@/components/Header";
import { useGetOrdersQuery } from "@/state/api";
import { usePostNewOrderMutation } from "@/state/api";

function Orders() {
  const [view, setView] = useState("list");
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = useGetOrdersQuery();
  const [postOrder] = usePostNewOrderMutation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");

  const handleCreateOrder = async () => {
    try {
      await postOrder({ name, price, currency, description }).unwrap();
      alert("Order created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setView("list");
    } catch (err) {
      alert("Failed to create order.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Manage Orders" />

      {/* TopBar Toggle */}
      <Box display="flex" gap="1rem" mb="1.5rem">
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
        >
          📦 View Orders
        </Button>
        <Button
          variant={view === "create" ? "contained" : "outlined"}
          onClick={() => setView("create")}
        >
          ➕ Create Order
        </Button>
      </Box>

      {/* Conditional View */}
      {view === "list" ? (
        isLoading ? (
          <Box height="60vh" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data.map((order) => (
              <OrderCard key={order._id} {...order} />
            ))}
          </Box>
        )
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          maxWidth="400px"
          p="1.5rem"
          bgcolor="background.alt"
          borderRadius="0.55rem"
        >
          <Typography variant="h5">Create New Order</Typography>
          <TextField
            label="Order Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Button variant="contained" onClick={handleCreateOrder}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
}

function OrderCard({ name, price, currency, description, components = [] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ backgroundColor: "#1a1a2b", color: "#fff" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{name}</Typography>
        <Typography>{price} <span style={{ color: "#00e676" }}>{currency}</span></Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setExpanded(!expanded)}>Parts</Button>
        <IconButton color="error" size="small"><DeleteIcon fontSize="small" /></IconButton>
      </CardActions>
      <Collapse in={expanded}>
        <CardContent>
          {components.map((comp, idx) => (
            <Typography key={idx} variant="body2">
              • {comp.quantityNeeded} — {comp.notes}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Orders;