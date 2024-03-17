"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.User = void 0;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB);
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        maxlength: 64,
        required: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 128
    },
    password: {
        type: String,
        maxlength: 64
    },
    images: [
        {
            type: String,
            ref: 'Image'
        }
    ]
});
const imageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        maxlength: 64,
        required: true
    }
});
exports.User = mongoose.model('User', userSchema);
exports.Image = mongoose.model('Image', imageSchema);
