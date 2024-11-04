import { Box, Skeleton, Divider, Grid2 as Grid } from '@mui/material';

const ModuleLoader = () => {
    return (
        <>
        <Box display="flex" flexDirection="column" gap="20px" flex="1 1 auto">
        <Skeleton variant="rounded" width="100%" height={40} animation="pulse" />
        <Skeleton variant="rounded" width="100%" height={40} animation="pulse" />
        </Box>
        <Divider sx={{marginTop: 4, marginBottom: 4}} />
        <Grid container spacing={2}>
        {
          [...new Array(8)].map((_, i) => <Grid key={i} size={{xs: 12, sm: 6, lg: 4}}>
          <Box display="flex" flexDirection="column" gap="10px" alignItems="center">
          <Skeleton variant="rounded" width="100%" height={300} animation="pulse" />
          <Skeleton variant="rounded" width="100%" height={15} animation="pulse" />
          </Box>
          </Grid>)
        }
        </Grid>
        </>
    )
}

export default ModuleLoader;