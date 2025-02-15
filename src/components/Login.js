import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Attempting to log in with:", { username, password });
    // Simple authentication logic (replace with real authentication)
    if (username === "user" && password === "password") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", username);
      console.log("Login successful, redirecting to /invoice");
      navigate("/invoice", { replace: true });
    } else {
      console.log("Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h4" mb={2}>
          Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2, textTransform: "none", borderRadius: 1 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
