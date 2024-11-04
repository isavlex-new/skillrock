import { Card, CardActionArea, CardContent, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React from 'react'

type PostCardProps = {
  children: React.ReactNode
  size: number
}

export const PostCard: React.FC<PostCardProps> = ({ children, size }) => {
  return (
    <Grid size={size}>
      <Paper>
        <Card>
          <CardActionArea>
            <CardContent>
              {children}
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Grid>
  )
}
