import {Document, model, Schema, Query} from "mongoose"

export interface IVariable extends Document {
    name: string,
    slug: string
}

export interface VariableQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<IVariable>> & VariableQueryHelpers;
}

export const VariableSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required']
    }
}, { versionKey: false })

VariableSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const Variable = model<IVariable, VariableQueryHelpers>('Variable', VariableSchema)