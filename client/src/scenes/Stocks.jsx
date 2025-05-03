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
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Header from "@/components/Header";
import { useGetStocksQuery } from "@/state/api";
import { useDeleteStockMutation } from "@/state/api";

function Stock({
  _id,
  number,
  item,
  type,
  location,
  description,
  attribute1,
  attribute2,
  attribute3,
  attribute4,
  quantity,
  unit,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteStock] = useDeleteStockMutation();

  const handleDelete = async () => {
    if (!_id) {
      console.error("No ID provided for deletion");
      return;
    }
    if (window.confirm("Are you sure you want to remove this stock?")) {
      try {
        await deleteStock(_id).unwrap();
        console.log("Stock deleted successfully");
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
          {item}
        </Typography>
        <Typography variant="h7" sx={{ mb: "1rem", fontWeight: 'bold' }} component="div" color="whitesmoke">
          Stock <span style={{ color: theme.palette.secondary[700] }}>#{number}</span>
        </Typography>
        <Typography sx={{ mb: "1.5rem", fontSize: 14}} color="white">
          {quantity} <Typography component="span" sx={{color: theme.palette.success.main, fontWeight: 'bold', textTransform: 'uppercase', fontSize: 11}}>{unit}</Typography>
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          Details
        </Button>
        <IconButton variant="contained" color="error" size="small" onClick={handleDelete}><DeleteIcon fontSize="small" /></IconButton>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{color: theme.palette.neutral[300],}}>
        <CardContent>
          <Typography>Number: {number}</Typography>
          <Typography>Item: {item}</Typography>
          <Typography>Type: {type}</Typography>
          <Typography>Location: {location}</Typography>
          <Typography>Description: {description}</Typography>
          <Typography>Attribute 1: {attribute1}</Typography>
          <Typography>Attribute 2: {attribute2}</Typography>
          <Typography>Attribute 3: {attribute3}</Typography>
          <Typography>Attribute 4: {attribute4}</Typography>
          <Typography>Quantity: {quantity}</Typography>
          <Typography>Unit: {unit}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function Stocks() {
  const { data, isLoading, isError } = useGetStocksQuery();
  //console.log(data, isLoading, isError);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [typeFilter, setTypeFilter] = useState("");

  const handleTypeChange = (_, newType) => {
    setTypeFilter(newType);
  };
  
  const filteredData = typeFilter ? data.filter((stock) => stock.type === typeFilter) : data;

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
      <Header title="STOCKS" subtitle="List Of Stocks" />
      <Box display="flex" alignItems="center" gap="1.25rem" mb="1.5rem" mt="2rem">
        <FilterAltIcon color="secondary"/>
        <ToggleButtonGroup
          color="secondary"
          value={typeFilter}
          exclusive
          onChange={handleTypeChange}
          size="small"
          sx={{
            backgroundColor: theme => theme.palette.background.paper,
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              textTransform: 'capitalize',
              fontWeight: 600,
              padding: '6px 16px',
            }
          }}
        >
          <ToggleButton value="">All</ToggleButton>
          <ToggleButton value="raw-material">Raw Material</ToggleButton>
          <ToggleButton value="component">Component</ToggleButton>
        </ToggleButtonGroup>
      </Box>
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
        {filteredData.map(({ _id, number, item, type, location, description, attribute1, attribute2, attribute3, attribute4, quantity, unit }) => (
            <Stock
              key= {_id}
              _id= {_id}
              number={number}
              item={item}
              type={type}
              location={location}
              description={description}
              attribute1={attribute1}
              attribute2={attribute2}
              attribute3={attribute3}
              attribute4={attribute4}
              quantity={quantity}
              unit={unit}
            />
        ))}
      </Box>
    </Box>
  );
}

export default Stocks;
