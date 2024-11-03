import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { loginBox, container } from "../styles";
import "../styles.css";

const Login = ({
  onLogin,
}: {
  onLogin: (token: string, expiry: number) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validUsername = "1";
    const validPassword = "1";
    const token = "yourGeneratedToken";
    const expiry = Date.now() + 3600 * 1000;

    if (username === validUsername && password === validPassword) {
      onLogin(token, expiry);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="xs" sx={container}>
      <Box sx={loginBox}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Username"
            value={username}
            sx={{ marginBottom: " 2rem" }}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            sx={{ marginBottom: " 2rem" }}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: " 0.8rem" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
