import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Grid2 } from '@mui/material';
import React from 'react';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: 9.99 },
  { name: 'Product 2', desc: 'Another thing', price: 3.45 },
  { name: 'Product 3', desc: 'Something else', price: 6.51 },
  { name: 'Product 4', desc: 'Best thing of all', price: 14.11 },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const price = products.reduce((acc, current) => acc += current.price, 0)

export const Review = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem  key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem  key='shipping'>
            <ListItemText primary='Shipping' secondary='Free' />
            <Typography variant="body2">Free</Typography>
          </ListItem>
        <ListItem >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" >
            ${price}
          </Typography>
        </ListItem>
      </List>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid2>
        <Grid2 container size={6} direction="column">
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Grid2 container spacing={3}>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid2 size={5}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid2>
                <Grid2 size={7}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid2>
              </React.Fragment>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  )
}
