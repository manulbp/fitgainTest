import { Checkout } from "../models/checkout.model.js";

export const getCheckout = async (req, res) => {

    Checkout.find()
        .then(checkout => {
            res.json(checkout);
        })
        .catch(error => {
            console.error('Error fetching checkout:', error);
            res.status(500).json({ message: 'Internal server error ' });
        });
};

export const addCheckout = async (req, res) => {

    try {
        const { fname, lname, street, city, state, zipcode, total, mobile, userMail, userId } = req.body;

        const checkout = new Checkout({
            fname,
            lname,
            street,
            city,
            state,
            zipcode,
            total,
            mobile,
            userMail,
            userId
        });
        await checkout.save();
        res.json({ success: true, message: 'Product added to checkout successfully ' });
    } catch (error) {
        console.error('Error adding product to checkout: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



export const deleteCheckout = async (req, res) => {

    const { _id } = req.body;
    try {
        const deleteCheckout = await Checkout.findOneAndDelete({ _id: _id });

        if (deleteCheckout) {
            return res.status(200).json(deleteCheckout);
        } else {
            return res.status(404).json({ message: 'Checkout not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
}


export const statusupdate = async (req, res) => {

    const { _id, status } = req.body;

    try {
        const updatestatus = await Checkout.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true }
        )

        if (updatestatus) {
            res.status(200).json(updatestatus);
        } else {
            res.status(404).json({ message: 'Checkout not found' });
        }
    } catch (error) {
        console.error('Error updating status: ', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}
