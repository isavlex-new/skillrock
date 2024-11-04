import React, {useEffect, useState} from 'react';
import { login } from '../../features/auth/authThunk';
import {TextField, Button, Typography, FormControl, FormLabel, Link, FormControlLabel, Checkbox} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Box from "@mui/material/Box";
import ForgotPassword from "./ForgotPassword.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedStore.ts";

const Login = () => {
    // const [credentials, setCredentials] = useState({ username: '', password: '' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated} = useAppSelector((state) => state.auth);

    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    const [passwordError] = useState<boolean>(false);
    const [passwordErrorMessage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(login({
            username: data.get('email'),
            password: data.get('password'),
        }));
    };

    const validateInputs = () => {
      const email = document.getElementById("email");
      // const password = document.getElementById('password');

      let isValid = true;

      if (
        !(email instanceof HTMLInputElement) ||
        !/\S+@\S+\.\S+/.test((email as HTMLInputElement).value)
      ) {
        setEmailError(true);
        setEmailErrorMessage("Please enter a valid email address.");
        isValid = false;
      }

      return isValid;
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard'); // Redirect to dashboard upon successful login
        }
    }, [isAuthenticated, navigate]);

    const Card = styled(MuiCard)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        padding: theme.spacing(4),
        gap: theme.spacing(2),
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '450px',
        },
        boxShadow:
            'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        ...theme.applyStyles('dark', {
            boxShadow:
                'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
        }),
    }));

    const SignInContainer = styled(Stack)(({ theme }) => ({
        padding: 20,
        marginTop: '10vh',
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
                backgroundImage:
                    'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
        },
    }));

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                            sx={{ ariaLabel: 'email' }}
                        />
                    </FormControl>
                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Link
                                component="button"
                                onClick={handleClickOpen}
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        Sign in
                    </Button>
                </Box>
            </Card>
        </SignInContainer>
    )
};

export default Login;
