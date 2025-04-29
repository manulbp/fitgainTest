import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/AddCheckoout')}> Proceed to Checkout</Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/Checkouts')}>
        Your checkouts
      </Button>
    </div>
  )
}
