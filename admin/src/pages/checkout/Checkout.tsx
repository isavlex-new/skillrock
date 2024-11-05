import { useState } from 'react'
import CenteredPaper from './UI/CenterdePaper'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { AddressForm } from './components/AddressForm'
import { PaymentForm } from './components/PaymentForm'
import { Review } from './components/Review'

const steps = ['Shipping address', 'Payment details', 'Review your order']

const getStep = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return <PaymentForm />
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <CenteredPaper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ padding: '24px 0 40px' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </>
      ) : (
        <>
          {getStep(activeStep)}
          <Box textAlign="right" paddingTop={2}>
            {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
            <Button variant="contained" color="primary" onClick={handleNext} sx={{marginLeft: 1}}>
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </CenteredPaper>
  )
}

export default Checkout
