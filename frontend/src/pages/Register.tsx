import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            userName: userName,
          }),
        },
      );

      if (response.ok) {
        setMessage("Account created successfully! You can now login.");
      } else {
        setMessage("Registration failed!");
      }
    } catch {
      setMessage("cannot connect to server!");
    }
  };

  return (
    <Box className="route_layer flex-1 flex w-full h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container maxWidth="sm">
        <Card 
          elevation={0}
          className=" card p-10 shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] bg-white/95 backdrop-blur-xl border border-white/20 "
          sx={{ borderRadius: '16px' }}
        >
          <Box className="text-center mb-8">
            <Typography
              variant="h3"
              className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
              gutterBottom
            >
              Task Master
            </Typography>
            <Typography variant="h6" className="text-gray-500 font-medium">
              Start organizing your life today ✨
            </Typography>
          </Box>

          <Box
            component="form"
            className="flex flex-col gap-5"
            onSubmit={handleRegister}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg font-bold shadow-lg transform transition-all duration-200 hover:-translate-y-1"
            >
              Create Account
            </Button>

            {message && (
              <Typography className="text-center mt-2 font-medium text-pink-500">
                {message}
              </Typography>
            )}

            <Box className="mt-6 text-center">
              <Typography variant="body2" className="text-gray-600">
                Already have an account?{' '}
                {/* <a href="/login" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
                  Sign in here
                </a> */}
                <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
