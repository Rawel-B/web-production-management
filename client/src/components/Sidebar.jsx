/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  InventoryOutlined,
  ViewListOutlined
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useAuth } from '../AuthContext';
import { usePostNewSupportTicketMutation } from "@/state/api";
import { useLogoutMutation } from '@/state/api';

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Modules", icon: null },
  { text: "Orders", icon: <ViewListOutlined /> },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Stocks", icon: <InventoryOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Workers", icon: <Groups2Outlined /> },
  { text: "Support", icon: <ReceiptLongOutlined /> },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> }
];

export default function Sidebar({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [logoutApi] = useLogoutMutation();
  const { logout, user} = useAuth();
  const [ticketOpen, setTicketOpen] = useState(false);
  const [submitTicket, { isLoading: ticketLoading }] = usePostNewSupportTicketMutation();
  const [ticketData, setTicketData] = useState({
    email: user?.email || "",
    subject: "",
    type: "",
    message: ""
  });

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    if (user?.role?.toLowerCase() === 'unauthorized') {
      setTicketOpen(true);
    }
  }, [user?.role]);

  const handleTicketChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleTicketSubmit = async () => {
    try {
      await submitTicket(ticketData).unwrap();
      alert('Support ticket submitted successfully!');
      setTicketOpen(false);
      console.log("Ticket open state set to False.");

      await logoutApi().unwrap();
      console.log("Logging out...");
      logout();
      console.log("Logged out.");
      navigate('/login');
      console.log("Navigated back to login.");
    } catch (err) {
      console.error('Ticket submission error:', err);
      alert('Failed to submit support ticket.');
    }
  };

  const visibleNavItems = navItems.filter(({ text }) => {
    const role = user?.role?.toLowerCase();
    const permissions = user?.permission?.map(p => p.toLowerCase()) || [];
    //const managerAccess = ['Overview','Daily','Monthly','Breakdown','Workers','Support','Admin','Performance'];
    //const workerAccess = ['Dashboard', 'Orders','Products','Stocks','Geography'];

    if (role === 'admin') return true; // Override All
    if (role === 'manager') {
      if (text?.toLowerCase() === 'sales' || text?.toLowerCase() === 'management') { // Side Bar Title Not An Actual Item (Not Included In Permissions)
        return true;
      } else {
        return permissions.includes(text?.toLowerCase());
      }    }
    if (role === 'worker') {
      if (text?.toLowerCase() === 'modules') { // Side Bar Title Not An Actual Item (Not Included In Permissions)
        return true;
      } else {
        return permissions.includes(text?.toLowerCase());
      }
     }

    return false;
  });

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: theme.palette.background.alt }
          }}
        >
          <Box m="1.5rem 2rem 1.5rem 3rem">
            <FlexBetween>
              <Typography variant="h4" fontWeight="bold">Production Management</Typography>
              {!isNonMobile && <IconButton onClick={() => setIsSidebarOpen(false)}><ChevronLeft /></IconButton>}
            </FlexBetween>
          </Box>
          <Divider />
          <List>
            {visibleNavItems.map(({ text, icon }) => (
              icon ? (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => { navigate(`/${text.toLowerCase()}`); setActive(text.toLowerCase()); }} selected={active === text.toLowerCase()}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                    {active === text.toLowerCase() && <ChevronRightOutlined />}
                  </ListItemButton>
                </ListItem>
              ) : (
                <Typography key={text} sx={{ m: '2rem 0 1rem 2rem' }} color={theme.palette.secondary[300]}>{text}</Typography>
              )
            ))}
          </List>
        </Drawer>
      )}

      {/* Unauthorized Support Ticket Dialog */}
      <Dialog open={ticketOpen} onClose={() => setTicketOpen(false)}>
        <DialogTitle>Submit Support Ticket</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Your account is unauthorized. Please describe your issue and we’ll contact you at {ticketData.email}.
          </Typography>
          <TextField fullWidth label="Subject" name="subject" value={ticketData.subject} onChange={handleTicketChange} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={ticketData.type} label="Type" onChange={handleTicketChange}>
              <MenuItem value="Unauthorized Access">Unauthorized Access</MenuItem>
              <MenuItem value="Login Issue">Login Issue</MenuItem>
              <MenuItem value="Bug Report">Bug Report</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextareaAutosize
            minRows={4}
            name="message"
            placeholder="Describe your issue here..."
            value={ticketData.message}
            onChange={handleTicketChange}
            style={{ width: '100%', padding: 8, borderRadius: 4, borderColor: theme.palette.divider, fontFamily: 'inherit' }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setTicketOpen(false)}>Cancel</Button> */}
          <Button onClick={handleTicketSubmit} variant="contained" disabled={!ticketData.subject.trim() || !ticketData.type || !ticketData.message.trim() || ticketLoading}>
            {ticketLoading ? <CircularProgress size={24} /> : 'Submit Ticket'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
