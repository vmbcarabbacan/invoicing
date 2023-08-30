import {Document, model, Schema, Query} from "mongoose"

export interface IBrand extends Document {
    name: string,
}

export interface BrandQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<IBrand>> & BrandQueryHelpers;
}

export const BrandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, { versionKey: false })

BrandSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const Brand = model<IBrand, BrandQueryHelpers>('Brand', BrandSchema)