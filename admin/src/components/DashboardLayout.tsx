import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    )
};

export default DashboardLayout;
