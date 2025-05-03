import { useState, useEffect } from "react";
import { useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSupportTicketsQuery, useUpdateSupportTicketMutation } from "@/state/api";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Header from "@/components/Header";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";
import { GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

function Support() {
  const theme = useTheme();
  const [updateTicket] = useUpdateSupportTicketMutation();
  const [statusFilter, setStatusFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const { data, isLoading } = useGetSupportTicketsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
    status: statusFilter === "All" ? undefined : statusFilter,
  });

  useEffect(() => {
    console.log("Status filter changed:", statusFilter);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [statusFilter]);
  
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setOpenModal(true);
    console.log("message opened.")
  };

  const handleResolve = async (_id) => {
    const status = "Resolved";

    if (!_id) {
      console.error("No ID provided for resolving");
      return;
    }
    if (!window.confirm("Are you sure you want to mark this ticket as resolved?")) {
      return;
    }
    try {
      console.log("Resolving ticket with _id :", _id);
      await updateTicket({ _id, status }).unwrap()
      console.log("Ticket resolved successfully");
    } catch (error) {
      console.error("Resolve failed:", error);
      alert(`Resolve failed: ${error.data?.message || "Server error"}`);
    }
  };

  const handleClose = async (_id) => {
    const status = "Closed";
    
    if (!_id) {
      console.error("No ID provided for closing");
      return;
    }
    if (!window.confirm("Are you sure you want to close this ticket?")) {
      return;
    }
    try {
      console.log("Closing ticket with _id :", _id);
      await updateTicket({ _id, status }).unwrap()
      console.log("Ticket closed successfully");
    } catch (error) {
      console.error("Closing failed:", error);
      alert(`Closing failed: ${error.data?.message || "Server error"}`);
    }
  };

  console.log("support page data :", data);
  console.log("tickets length:", data?.tickets?.length);

  const CustomToolbar = ({ statusFilter, setStatusFilter }) => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" p="0.5rem 1rem">
        <Box display="flex" gap="0.5rem">
          <GridToolbarColumnsButton style={{ color: theme.palette.secondary[400] }}/>
          <GridToolbarDensitySelector style={{ color: theme.palette.secondary[400] }}/>
          <GridToolbarExport style={{ color: theme.palette.secondary[400] }}/>
          <FormControl variant="standard" sx={{ minWidth: 110 }}>
            {/* <InputLabel>Status</InputLabel> */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ color: theme.palette.secondary[400], fontSize: 11 }}
              size = "small"
              // label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  };

  const columns = [
    {
      field: "_id",
      headerName: "Ticket ID",
      flex: 1,
    },
    {
      field: "email",
      headerName: "User Email",
      flex: 1.5,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 2,
    },
    {
      field: "type",
      headerName: "Issue Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Received At",
      flex: 1.2,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      renderCell: (params) => (
        <button
          style={{
            background: "none",
            border: "none",
            color: theme.palette.secondary[400],
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "0.85rem",
          }}
          onClick={() => handleViewMessage(params.row.message)}
        >
          Read
        </button>
      ),
    },
    {
      field: "operations",
      headerName: "Operations",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.status;
        const isResolvedOrClosed = status === "Resolved" || status === "Closed";
        const isClosed = status === "Closed";

        return (
          <Box>
            <IconButton
              sx={{ color: theme.palette.success.main }}
              onClick={() => handleResolve(params.row._id)}
              disabled={isResolvedOrClosed}
            >
              <CheckCircle />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleClose(params.row._id)}
              disabled={isClosed}
            >
              <Cancel />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="SUPPORT TICKETS" subtitle="All received support inquiries" />
      <Box
        height="77vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.tickets) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pageSizeOptions={[20, 50, 100]}
          pagination
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => setSort(newSortModel[0] || {})}
          slots={{ toolbar: CustomToolbar}}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch, statusFilter, setStatusFilter },
          }}
        />
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle color={theme.palette.secondary[400]}>Ticket Message</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {selectedMessage}
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Support;
