import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-1/3 mx-auto mt-4 rounded-2xl bg-brand-gradient text-white shadow-lg">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskMaster Pro
          </Typography>
          <div className="flex gap-12">
              <div className="px-4 py-2 rounded-full">
                <Button color="inherit">Quadrand</Button>
              </div>
              <div className="px-4 py-2 rounded-full">
                <Button color="inherit">All Tasks</Button>
              </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
