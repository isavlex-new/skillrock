import {Typography, Link } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React from 'react'

type SocialProps = {
  anchor: string
  link?: string
  color?: string
}

export const withSocialLink = (IconComponent: React.ElementType) => {
  return ({anchor, link, color}: SocialProps) => (
    <Link href={link} color={color}>
      <Grid container spacing={1} alignItems="center">
        <Grid>
          <IconComponent />
        </Grid>
        <Grid>
          <Typography variant="body1" >
            {anchor}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  )
}
