import {
  Checkbox,
  FormControlLabel,
  Grid2,
  TextField,
  Typography,
} from '@mui/material'

export const AddressForm = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={6} >
          <TextField
            variant='standard'
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            variant='standard'
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            variant='standard'
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            variant='standard'
            required
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            variant='standard'
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address level2"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            variant='standard'
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            variant='standard'
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            variant='standard'
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid2>
        <Grid2>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid2>
      </Grid2>
    </>
  )
}
