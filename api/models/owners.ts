import mongoose, {Document, Schema } from "mongoose"
import { statuses } from "../utils/constant";
import { DefaultTypes } from '../types'

const master = mongoose.createConnection('mongodb://127.0.0.1:27017/master');

export interface IOwner extends Document {
    name: string,
    email: string,
    contact_number: string,
    database: string,
    status: number,
    _doc: any,
    View(): IOwner,
}

const userStatuses = statuses.map((status:DefaultTypes) => status.value)

export const OwnerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'Email already taken'],
        validate(val: string) {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(val)) throw new Error("Please enter valid email address");
        }
    },
    contact_number: {
        type: String,
        required: false,
    },
    database: {
        type: String,
        required: [true, 'Database is missing'],
        unique: [true, 'Database must be unique']
    },
    status: {
        type: Number,
        required: [true, 'Please select user status'],
        enum: userStatuses,
        validate(val: number) {
            if (!userStatuses.includes(val)) throw new Error(`Status is not supported`);
            },
    }
},{
    timestamps: true,
    versionKey: false 
})

OwnerSchema.methods ={
    View(){
        return {
            ...this._doc,
            password: undefined
        }
    },
}

export const Owner = master.model<IOwner>('Owner', OwnerSchema)
