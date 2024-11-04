import {useEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';
import { checkAuth } from "./features/auth/authThunk";
import {useAppDispatch} from "./hooks/useTypedStore.ts";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(checkAuth()); // Check auth status on app load
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    );
};

export default App;
