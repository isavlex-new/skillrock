import {
  Typography,
  Container,
  Link,
  Box,
  Paper,
  CssBaseline,
} from '@mui/material'

import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Header } from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import { withSocialLink } from './components/withSocialLink'
import { PostCard } from './components/PostCard'
import { Archives } from './components/Archives'
import Divider from '@mui/material/Divider'

const GitHubLink = withSocialLink(GitHubIcon)
const TwitterLink = withSocialLink(TwitterIcon)
const FacebookLink = withSocialLink(FacebookIcon)

const localTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Задаем основной шрифт
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280, // Устанавливаем lg на 1280px
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff', // Белый фон
    },
  },
})

function Post() {
  return (
    <Grid
      direction="column"
      container
      sx={{
        pb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Another blog post
      </Typography>
      <Typography variant="subtitle1" gutterBottom fontSize={12}>
        March 23, 2020 by <Link color="secondary">Matt</Link>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This blog post shows a few different types of content that are supported
        and styled with Material styles. Basic typography, images, and code are
        all supported. You can extend these by modifying Markdown.js. Cum sociis
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum. Sed posuere consectetur est at lobortis. Cras mattis
        consectetur purus sit amet fermentum. Curabitur blandit tempus
        porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam
        id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem
        malesuada magna mollis euismod. Cras mattis consectetur purus sit amet
        fermentum. Aenean lacinia bibendum nulla sed consectetur.
      </Typography>
    </Grid>
  )
}

export default function Blog() {
  return (
    <ThemeProvider theme={localTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <Grid
            container
            columns={10}
            sx={{
              p: 8,
              backgroundColor: '#464646',
              color: '#fff',
              mb: 4,
            }}
          >
            <Grid size={5}>
              <Typography variant="h3" color="inherit" gutterBottom>
                Title of a longer featured blog post
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Multiple lines of text that form the lede, informing new readers
                quickly and efficiently about what's most interesting in this
                post's contents.
              </Typography>
              <Link
                href="#"
                underline="hover"
                variant="subtitle1"
                color="secondary"
              >
                Continue reading…
              </Link>
            </Grid>
          </Grid>
          <Grid container columns={10} spacing={3}>
            <PostCard size={5}>
              <Typography variant="h5">Featured post</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Nov 12
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                Continue reading...
              </Typography>
            </PostCard>
            <PostCard size={5}>
              <Typography variant="h5">Featured post</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Nov 12
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                Continue reading...
              </Typography>
            </PostCard>
          </Grid>

          <Grid
            container
            columns={10}
            sx={{
              py: 3,
            }}
          >
            <Grid size={7} paddingRight={3}>
              <Typography variant="h6" gutterBottom>
                From the firehose
              </Typography>
              <Divider sx={{ marginBottom: '20px' }} />
              <Post />
              <Post />
            </Grid>
            <Grid size={3}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: '#eeeeee',
                }}
                elevation={0}
              >
                <Typography variant="h6">About</Typography>
                <Typography variant="subtitle1">
                  Etiam porta sem malesuada magna mollis euismod. Cras mattis
                  consectetur purus sit amet fermentum. Aenean lacinia bibendum
                  nulla sed consectetur.
                </Typography>
              </Paper>
              <Archives />
              <Grid container direction="column" rowSpacing={1}>
                <Typography variant="h6">Social</Typography>
                <GitHubLink anchor="GitHub" link="#" color="secondary" />
                <TwitterLink anchor="Twitter" link="#" color="secondary" />
                <FacebookLink anchor="Facebook" link="#" color="secondary" />
              </Grid>
            </Grid>
          </Grid>
        </main>
        <Box sx={{ p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
          >
            Something here to give the footer a purpose! Copyright © Your
            Website &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
