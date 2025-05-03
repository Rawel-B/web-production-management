import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize
} from "@mui/material";
import Header from "@/components/Header";
import { Email, Lock, SupportAgent } from "@mui/icons-material";
import { useLoginMutation } from "@/state/api";
import { useAuth } from '../AuthContext';
import { usePostNewSupportTicketMutation } from "@/state/api";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function Login() {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketMessage, setTicketMessage] = useState("");
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [submitTicket, { isLoading: ticketLoading }] = usePostNewSupportTicketMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [ticketData, setTicketData] = useState({
    email: formData.email,
    subject: "",
    type: "",
    message: ""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "email") {
      setTicketData((prev) => ({ ...prev, email: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user, accessToken } = await loginMutation(formData).unwrap();
      const raw = await loginMutation(formData).unwrap();
      console.log("🎯 raw login response:", raw);
      console.log("user:", user);
      console.log("accessToken:", accessToken);

      if (!user || !accessToken) {
        throw new Error("Login failed");
      }
      
      await login(accessToken);
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  const handleSupportTicket = () => {
    setTicketOpen(true);
  };

  const handleTicketChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value
    });
  };
  const handleTicketSubmit = async () => {
    try {
      console.log("support ticket sent :", ticketData);
      await submitTicket(ticketData).unwrap();
      alert("Support ticket submitted successfully!");
      setTicketOpen(false);
      setTicketData({
        email: formData.email,
        subject: "",
        type: "",
        message: ""
      });
    } catch (err) {
      console.error("Ticket submission error:", err);
      alert("Failed to submit support ticket.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PORTAL" subtitle="PRODUCTION MANAGEMENT" />
      
      {/* Centered Login Form */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <Card
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            width: isNonMobile ? "50%" : "90%",
            p: "2rem",
            mb: "2rem"
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: "1.5rem", textAlign: "center" }}
              color={theme.palette.secondary[700]}
            >
              Sign In
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="1.5rem">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ color: theme.palette.secondary[300], mr: 1 }} />
                    )
                  }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <Lock sx={{ color: theme.palette.secondary[300], mr: 1 }} />
                    )
                  }}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: "1rem",
                    p: "1rem",
                    backgroundColor: theme.palette.secondary[500],
                    "&:hover": { backgroundColor: theme.palette.secondary[600] }
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Support Ticket Section - Now below the login form */}
        <Card
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            width: isNonMobile ? "50%" : "90%",
            p: "2rem"
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: "1.5rem", textAlign: "center" }}
              color={theme.palette.secondary[700]}
            >
              Need Help?
            </Typography>
            
            <Typography variant="body1" sx={{ mb: "2rem", textAlign: "center" }}>
              If you're having trouble accessing your account, contact your administrator.
            </Typography>
            
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                startIcon={<SupportAgent />}
                onClick={handleSupportTicket}
                disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                sx={{
                  color: theme.palette.secondary[500],
                  borderColor: theme.palette.secondary[500],
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[50],
                    borderColor: theme.palette.secondary[600]
                  }
                }}
              >
                Request Support Ticket
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Support Ticket Dialog */}
      <Dialog open={ticketOpen} onClose={() => setTicketOpen(false)}>
        <DialogTitle>Submit Support Ticket</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please describe your issue and we’ll contact you at {ticketData.email || "your email"}.
          </Typography>

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={ticketData.subject}
            onChange={handleTicketChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="ticket-type-label">Type</InputLabel>
            <Select
              labelId="ticket-type-label"
              id="ticket-type"
              name="type"
              value={ticketData.type}
              label="Type"
              onChange={handleTicketChange}
            >
              <MenuItem value="Login Issue">Login Issue</MenuItem>
              <MenuItem value="Unauthorized Access">Unauthorized Access</MenuItem>
              <MenuItem value="Bug Report">Bug Report</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextareaAutosize
            minRows={4}
            name="message"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              borderColor: theme.palette.divider,
              fontFamily: 'inherit'
            }}
            placeholder="Describe your issue here..."
            value={ticketData.message}
            onChange={handleTicketChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTicketOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleTicketSubmit}
            variant="contained"
            disabled={    !ticketData.subject.trim() || !ticketData.type.trim() || !ticketData.message.trim()}>
            Submit Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;