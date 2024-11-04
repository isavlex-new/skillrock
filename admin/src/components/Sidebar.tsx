import {List, ListItem, ListItemIcon, ListItemText, Theme} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import {styled, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {toggleSidebar} from "../features/dashboard/dashboardSlice";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedStore.ts";


const Sidebar = () => {
    const navigation_list = [
        {
            segment: '/dashboard/users',
            title: 'Users',
            icon: <PeopleAltOutlinedIcon/>,
        },
        {
            segment: '/dashboard/courses',
            title: 'Courses',
            icon: <ListAltOutlinedIcon/>,
        },
        {
            segment: '/dashboard/permissions',
            title: 'Permissions',
            icon: <ListAltOutlinedIcon/>,
        },
    ];

    const drawerWidth = 240;

    const openedMixin = (theme: Theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });


    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            variants: [
                {
                    props: ({ open }) => open,
                    style: {
                        ...openedMixin(theme),
                        '& .MuiDrawer-paper': openedMixin(theme),
                    },
                },
                {
                    props: ({ open }) => !open,
                    style: {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    },
                },
            ],
        }),
    );


    const theme = useTheme();
    const navigate = useNavigate();
    const { sidebarOpen } = useAppSelector((state) => state.dashboard);
    const dispatch = useAppDispatch();

    const handleDrawerClose = () => {
        dispatch(toggleSidebar())
    };

    return (
        <Drawer variant="permanent" open={sidebarOpen}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {navigation_list.map((nav) => (
                    <ListItem key={nav.title} disablePadding sx={{ display: 'block' }} onClick={() => {navigate(nav.segment)}}>
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                sidebarOpen
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    sidebarOpen
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                            {nav.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={nav.title}
                                sx={[
                                    sidebarOpen
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
};

export default Sidebar;
