
import React from 'react'
import { Box, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Checkbox, Switch, IconButton, styled } from '@mui/material';

const GloablPrice = () => {
  return (
   <>
   <Grid container className="main_you_cruiess" spacing={2}>
   <Grid item xs={12} md={12}>
   <Typography variant='h4'>Price Adjustments</Typography>
   <Typography variant='body2'>Control the global pricing of cruises by adding certain criteria and ordering the prioity in which the pricing should be applied. The pricing is applied to a cruise in the order below starting at the top and working down. When more than one price adjustment matches they will all be applied, again based on the order below.</Typography>
   </Grid>
   </Grid>
   </>
  )
}

export default GloablPrice