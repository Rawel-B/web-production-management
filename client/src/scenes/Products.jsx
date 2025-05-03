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
import { useGetProductsQuery } from "@/state/api";
import { useDeleteProductMutation } from "@/state/api";

function Product({
  _id,
  name,
  price,
  currency,
  description,
  category,
  rating,
  supply,
  components,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (!_id) {
      console.error("No ID provided for deletion");
      return;
    }
    if (window.confirm("Are you sure you want to permanently pull this product from listings?")) {
      try {
        await deleteProduct(_id).unwrap();
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        alert(`Delete failed: ${error.data?.message || "Server error"}`);
      }
    }
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h4" color={theme.palette.secondary[400]} gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {/* Sells For #{price} {currency} */}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color="white">
          {price} <span style={{ color: theme.palette.success.main }}>{currency}</span> 
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Parts
        </Button>
        <IconButton variant="contained" color="error" size="small" onClick={handleDelete}><DeleteIcon fontSize="small" /></IconButton>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
        {components.map((comp, index) => (
          <Box key={index} mb="0.5rem">
            <Typography variant="body2">
              • {comp.quantityNeeded} — <strong>{comp.notes}</strong>
              {comp.stockItem ? ` (${comp.stockItem})` : ""}
            </Typography>
          </Box>
        ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

function Products() {
  const { data, isLoading, isError } = useGetProductsQuery();
  console.log(data, isLoading, isError);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  if (!data || isLoading)
    return (
      <Box
        width="100%"
        height="100%"
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="Products Listings" />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {data.map(
          ({
            _id,
            name,
            price,
            currency,
            description,
            category,
            rating,
            supply,
            components,
          }) => (
            <Product
              key= {_id}
              _id= {_id}
              name={name}
              price={price}
              currency={currency}
              description={description}
              category={category}
              rating={rating}
              supply={supply}
              components={components}
            />
          )
        )}
      </Box>
    </Box>
  );
}
export default Products;
