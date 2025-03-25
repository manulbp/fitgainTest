import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import dotenv from "dotenv";

dotenv.config();
const loginSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        collection: "Login"
    });

loginSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWI_KEY, { expiresIn: "30d" }
    )
    return token
}
export const Login = mongoose.model('Login', loginSchema);

export const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        username: Joi.string().required().label("Username"),
        password: passwordComplexity().required().label("Password")
    });

    return schema.validate(data);
}
