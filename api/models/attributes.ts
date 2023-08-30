import {Document, model, Schema, Query} from "mongoose"

export interface IAttribute extends Document {
    name: string,
}

export interface AttributeQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<IAttribute>> & AttributeQueryHelpers;
}

export const AttributeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, { versionKey: false })

AttributeSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const Attribute = model<IAttribute, AttributeQueryHelpers>('Attribute', AttributeSchema)