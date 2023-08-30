import { Document, model, Schema, Query, Types } from "mongoose"
import { Variable } from "./variables";

export interface IVariableOption extends Document {
    name: string,
    variable: Types.ObjectId,
    slug: string
}

export interface VariableOptionQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<IVariableOption>> & VariableOptionQueryHelpers;
}

export const VariableOptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    variable: {
        type: Types.ObjectId,
        ref: Variable,
        required: [true, 'Variable must not be empty']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required']
    }
}, { versionKey: false })

VariableOptionSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const VariableOption = model<IVariableOption, VariableOptionQueryHelpers>('VariableOption', VariableOptionSchema)