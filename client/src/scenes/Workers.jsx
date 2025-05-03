import Header from "@/components/Header";
import { useGetAllWorkersQuery } from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useMemo } from 'react';
import { 
  Box, 
  useTheme, 
  Chip, 
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteUserMutation } from "@/state/api";
import { useUpdateUserMutation } from "@/state/api";

function Workers() {
  const theme = useTheme();
  const { data, isLoading } = useGetAllWorkersQuery();
  const [expandedRows, setExpandedRows] = useState([]);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const toggleRow = (_id, name) => {
    console.log(`Toggling tasks for: ${name} , ${_id}`);
    setExpandedRows(prev => 
      prev.includes(_id) 
        ? prev.filter(rowId => rowId !== _id) 
        : [...prev, _id]
    );
  };

  const handleDelete = async (_id, name) => {
    if (!_id) {
      console.error("No ID provided for deletion");
      return;
    }
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await deleteUser(_id).unwrap();
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        alert(`Delete failed: ${error.data?.message || "Server error"}`);
      }
    }
  };
  const handleEdit = async (_id, email) => {
    if (editingId === _id) {
      try {
        const emailToUpdate = email;
        console.log("updating using email :", emailToUpdate);
        console.log("form data sent :", editFormData);

        await updateUser({ 
          email: emailToUpdate, 
          editFormData,
        }).unwrap();

        setEditingId(null);
      } catch (error) {
        console.error("Update failed:", error);
        alert(`Update failed: ${error.data?.message || "Server error"}`);
      }
    } else {
      console.log("Updating using _id :", editFormData._id);
      if (!data) {
        console.error("No data available");
        return;
      }
      const userToEdit = data.find(user => user.email === email);
      if (!userToEdit) {
        console.error("User not found");
        return;
      }
      setEditFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        phoneNumber: userToEdit.phoneNumber || '',
        city: userToEdit.city || '',
        state: userToEdit.state || '',
        country: userToEdit.country || '',
        role: userToEdit.role || '',
        permission: userToEdit.permission || ''
      });
      setEditingId(_id);
    }
  };
  const handleEditChange = (e, field) => {
    setEditFormData({
      ...editFormData,
      [field]: e.target.value
    });
    console.log("edit form data :", editFormData);
  };
  

  const columns = useMemo(() => [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        const isEditing = editingId === params.row._id;
    
        return isEditing ? (
          <TextField
            name="name"
            defaultValue={editFormData.name || ''}
            onChange={(e) => handleEditChange(e, 'name')}
            variant="outlined"
            size="small"
            fullWidth
            autoFocus
            inputProps={{ style: { padding: '8px' } }}
            onKeyDown={(e) => e.stopPropagation()}
          />
        ) : (
          params.value
        );
      }
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      renderCell: (params) => {
        const isEditing = editingId === params.row._id;
    
        return isEditing ? (
          <TextField
            name="email"
            defaultValue={editFormData.email || ''}
            onChange={(e) => handleEditChange(e, 'email')}
            variant="outlined"
            size="small"
            fullWidth
            autoFocus
            inputProps={{ style: { padding: '8px' } }}
            onKeyDown={(e) => e.stopPropagation()}
          />
        ) : (
          params.value
        );
      }
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 0.8,
      renderCell: (params) => {
        const isEditing = editingId === params.row._id;
    
        return isEditing ? (
          <TextField
            name="phoneNumber"
            defaultValue={editFormData.phoneNumber || ''}
            onChange={(e) => handleEditChange(e, 'phoneNumber')}
            variant="outlined"
            size="small"
            fullWidth
            autoFocus
            inputProps={{ style: { padding: '8px' } }}
            onKeyDown={(e) => e.stopPropagation()}
          />
        ) : (
          params.value ? params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3") : "N/A"
        );
      }
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1.2,
      valueGetter: (params) => 
        [params.row.city, params.row.state, params.row.country]
          .filter(Boolean).join(", ") || "Not specified",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "admin" ? "error" : 
            params.value === "manager" ? "warning" : "success"
          }
          variant="outlined"
        />
      ),
    },
    {
      field: "permission",
      headerName: "Permission",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
        />
      ),
    },
    {
      field: "tasks",
      headerName: "Tasks",
      flex: 1,
      renderCell: (params) => {
        const isExpanded = expandedRows.includes(params.row._id);
        const tasks = params.row.tasks || [];
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={(e) => {
                //e.stopPropagation();
                toggleRow(params.row._id, params.row.name);
              }}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <span>
              {tasks.length > 0 ? (
                `${tasks.length} task(s)`
              ) : (
                <span style={{ color: theme.palette.text.secondary }}>No tasks</span>
              )}
            </span>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Operations",
      flex: 0.8,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <IconButton 
            variant="contained" 
            color={editingId === params.row._id ? "success" : "primary"}
            size="small" 
            disabled={isLoading || isUpdating}
            onClick={(e) => {
             // e.stopPropagation();
              handleEdit(params.row._id, params.row.email);
            }}
          >
            {editingId === params.row._id ? <CheckIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </IconButton>
          <IconButton 
            variant="contained" 
            color="error" 
            size="small" 
            onClick={(e) => {
              //e.stopPropagation();
              handleDelete(params.row._id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          {editingId === params.row._id && (
          <IconButton 
            variant="contained" 
            color="warning" 
            size="small" 
            onClick={(e) => {
              //e.stopPropagation();
              setEditingId(null);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          )}
        </Box>
      ),
    },
  ], [expandedRows, theme.palette.text.secondary, editingId, editFormData, handleEditChange]);

  return (
    <Box height="100%" maxHeight="90vh" p="1.5rem 2.5rem">
      <Header title="WORKERS" subtitle={`Managing ${data?.length || 0} workers`} />
      <Box
        mt="40px"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`,
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
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => String(row._id)}
          rows={data || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          onRowClick={(params) => toggleRow(params.id)}
          getDetailPanelContent={({ row }) => {
            const isExpanded = expandedRows.includes(row._id);
            if (!isExpanded) return null;
            
            const tasks = row.tasks || []; 
            
            return (
              <Box sx={{ 
                p: 2,
                bgcolor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}>
                <Typography variant="subtitle1" gutterBottom>
                  Assigned Tasks ({tasks.length}):
                </Typography>
                {tasks.length > 0 ? (
                  <List dense>
                    {tasks.map((task, index) => (
                      <ListItem key={index}>
                        <ListItemText 
                          primary={task}
                          primaryTypographyProps={{
                            style: {
                              whiteSpace: 'normal',
                              wordBreak: 'break-word'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No tasks assigned to this worker
                  </Typography>
                )}
              </Box>
            );
          }}
          getDetailPanelHeight={({ row }) => {
            const count = (row.tasks || []).length;
            return count > 0 ? count * 50 + 60 : 80;
          }}
          isDetailPanelExpanded={(params) => expandedRows.includes(params.row._id)}
        />
      </Box>
    </Box>
  );
}

export default Workers;