import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" className="bg-purple-600">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskMaster Pro
        </Typography>
        <Box>
          {/* We use React Router's <Link> instead of standard <a> tags so the page doesn't reload! */}
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
