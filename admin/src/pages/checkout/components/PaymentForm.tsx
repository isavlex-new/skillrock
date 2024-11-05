import { Checkbox, FormControlLabel, Grid2, TextField, Typography } from '@mui/material'

export const PaymentForm = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={6}>
          <TextField
            required
            variant="standard"
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            variant="standard"
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            variant="standard"
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            variant="standard"
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid2>
        <Grid2 size={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid2>
      </Grid2>
    </>
  )
}
