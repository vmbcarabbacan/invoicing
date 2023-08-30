import {Document, model, Schema, Types, Query} from "mongoose"
import { Category } from "./categories";

export interface ISubCategory extends Document {
    name: string,
    category: Types.ObjectId,
}

export interface SubCategoryQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<ISubCategory>> & SubCategoryQueryHelpers;
}

export const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    category: {
        type: Types.ObjectId,
        ref: Category,
        required: [true, 'Category is required']
    }
}, { versionKey: false })

SubCategorySchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const SubCategory = model<ISubCategory, SubCategoryQueryHelpers>('SubCategory', SubCategorySchema)