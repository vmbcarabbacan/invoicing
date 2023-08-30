import mongoose, { Document, Schema, Types } from "mongoose"
import bcrypt from "bcrypt"
import { roles, statuses } from "../utils/constant";
import { DefaultTypes } from '../types/'
import { Owner } from "./owners";

const master = mongoose.createConnection('mongodb://127.0.0.1:27017/master');

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: number,
    status: number,
    owner: Types.ObjectId,
    refresh_token: Array<string>,
    _doc: any,
    View(): IUser,
    isValidPassword(password: string): IUser,
    passwordHash(password: string): IUser
}

// interface UserModel extends Model<IUser> {
//     myStaticMethod(): number;
//   }

const userRoles = roles.map((role:DefaultTypes) => role.value);
const userStatuses = statuses.map((status:DefaultTypes) => status.value)

export const UserSchema = new Schema({
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
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: [true, 'Please select user role'],
        enum: userRoles,
        validate(val: number) {
            if (!userRoles.includes(val)) throw new Error(`Role is not supported`);
        },
    },
    owner: {
        type: Types.ObjectId,
        ref: Owner,
        required: [true, 'Owner must not be empty']
    },
    status: {
        type: Number,
        required: [true, 'Please select user status'],
        enum: userStatuses,
        validate(val: number) {
            if (!userStatuses.includes(val)) throw new Error(`Status is not supported`);
            },
    },
    refresh_token: {
        type: Array<String>,
        required: false
    }
},{
    timestamps: true,
    versionKey: false 
})

UserSchema.methods ={
    View(){
        return {
            ...this._doc,
            password: undefined
        }
    },

    async isValidPassword (password: string) {
        const user = this;
        return await bcrypt.compare(password, user.password);
    },

    async passwordHash (password: string) {
        return await bcrypt.hash(password, 10)
    }
}

export const User = master.model<IUser>('User',UserSchema)
