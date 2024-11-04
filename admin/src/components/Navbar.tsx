import {Toolbar, Typography, Button} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {toggleSidebar} from "../features/dashboard/dashboardSlice";
import { logoutUser } from '../features/auth/authThunk.ts';
import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedStore.ts";
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {StyledComponent} from "@emotion/styled";
import { useNavigate } from 'react-router-dom';

type customAppBarProps = {
    open: boolean;
}
type AppBarProps = MuiAppBarProps & customAppBarProps

const Navbar = () => {
    const navigate = useNavigate()

    const drawerWidth = 240;

    const AppBar: StyledComponent<AppBarProps, {}, {}> = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
                props: ({ open }: customAppBarProps) => open,
                style: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        ],
    }));

    const { sidebarOpen } = useAppSelector((state) => state.dashboard);
    const dispatch = useAppDispatch();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(logoutUser());
    }
    const handleDrawerOpen = () => {
        dispatch(toggleSidebar());
    };

    const handleBlog = () => {
        navigate('/blog')
    }

    return (
        <AppBar position="fixed" open={sidebarOpen}>
            <Toolbar sx={{ flexGrow: 1 }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                        {
                            marginRight: 5,
                        },
                        sidebarOpen && {display: 'none'},
                    ]}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Manage Courses and Users
                </Typography>
                <Button color="inherit" onClick={handleBlog}>Blog</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
