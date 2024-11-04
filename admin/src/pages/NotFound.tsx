import { Typography, Container } from '@mui/material';

const NotFound = () => {
    return (
        <Container>
            <Typography variant="h2" align="center" color="textSecondary">
                404 - Page Not Found
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary">
                Sorry, the page you are looking for does not exist.
            </Typography>
        </Container>
    );
};

export default NotFound;
