import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AllUsers from "./AllUsers";
import CheckoutReview from "./CheckoutReview";

const AdminDashboard = () => {
    const [switchwindow, setswtich] = useState(1);
    return (
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'lightyellow' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginRight: '3%',
                    padding: 5,
                    height: "100vh",
                    backgroundColor: 'black'
                }}
            ><Typography sx={{ color: 'white', fontSize: 20 }}>Admin Dashboard</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: '40%', }} onClick={() => setswtich(1)}>
                    Show users
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setswtich(2)}>
                    Checkout Review
                </Button>
            </Box>
            <Box
                sx={{
                    marginTop: '5%',
                }}
            >
                {switchwindow === 1 ? (
                    <AllUsers />
                ) : (
                    <CheckoutReview />
                )}
            </Box>
        </div>

    );
};

export default AdminDashboard;
