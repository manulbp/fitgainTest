import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
    Checkbox
} from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const cartData = [
    {
        id: 1,
        productName: "Adjustable Dumbbells",
        category: "Strength Training",
        condition: "New",
        quantity: 2,
        price: 220.0
    },
    {
        id: 2,
        productName: "Treadmill X100",
        category: "Cardio",
        condition: "Used - Good",
        quantity: 3,
        price: 650.0
    },
    {
        id: 3,
        productName: "Kettlebell 20kg",
        category: "Strength Training",
        condition: "New",
        quantity: 3,
        price: 500.0
    },
    {
        id: 4,
        productName: "Yoga Mat Pro",
        category: "Flexibility",
        condition: "New",
        quantity: 5,
        price: 225.0
    },
    {
        id: 5,
        productName: "Rowing Machine R500",
        category: "Cardio",
        condition: "Used - Like New",
        quantity: 1,
        price: 3000.0
    }
];

const Cart = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate();

    const handleItemSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartData.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    const totalCost = cartData
        .filter((item) => selectedItems.includes(item.id))
        .reduce((total, item) => total + item.quantity * item.price, 0);

    const handleCheckout = () => {
        const selectedCartItems = cartData.filter((item) => selectedItems.includes(item.id));
        navigate('/AddCheckoout', {
            state: {
                total: totalCost.toFixed(2),
                items: selectedCartItems
            }
        });
    };

    return (
        <div>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#D1D5DB' }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Price (LKR)</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleItemSelect(item.id)}
                                    />
                                </TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.condition}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button color="error">
                                        <FaTrash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Total Cost Summary Card */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mr: 2 }}>
                <Card sx={{ width: 300, p: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Cart Summary
                        </Typography>
                        <Typography variant="body1">
                            Total Cost: <strong>LKR {totalCost.toFixed(2)}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleCheckout}
                            disabled={selectedItems.length === 0}
                        >
                            Proceed to Checkout
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            style={{ backgroundColor: 'black' }}
                            onClick={() => navigate('/Checkouts')}
                        >
                            Your checkouts
                        </Button>
                    </CardContent>
                </Card>
            </Box>
            <br />
            <br />
        </div>
    );
};

export default Cart;
