import React from 'react'
import { Grid, Box,Card,CardContent, Typography } from "@mui/material";
const CruisesDash = () => {
  return (
    <>
     {/* Content Below Header */}
     <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users: 1 Million
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Sessions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sessions: 10 Million
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Bounce Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bounce Rate: 30%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </>
  )
}

export default CruisesDash