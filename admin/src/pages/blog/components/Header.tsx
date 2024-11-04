import { AppBar, Toolbar, Button, Typography, Box, Link } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

export function Header() {
  const links = [
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel',
  ]

  return (
    <AppBar position="relative" elevation={0}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          color: 'black',
        }}
      >
        <Button>Subscribe</Button>
        <Typography variant="h6" color="inherit" noWrap>
          BLOG
        </Typography>
        <Box>
          <Button>
            <SearchIcon />
          </Button>
          <Button>SIGN UP</Button>
        </Box>
      </Toolbar>
      <Toolbar
        sx={{
          backgroundColor: '#fff',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {links.map((link, index) => (
          <Typography variant="body2" color="inherit" noWrap component="div">
            <Link key={index + link} underline="hover" href="#">
              {link}
            </Link>
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  )
}