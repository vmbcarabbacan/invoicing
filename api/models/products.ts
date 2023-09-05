import { Schema, Types, model, Document, Query } from 'mongoose'
import { types, productStatuses } from '../utils/constant'
import { DefaultTypes } from '../types/'
import { Category } from './categories'
import { SubCategory } from './subCategories'
import { Brand } from './brands'
import { Tag } from './tags'
import { Attribute } from './attributes'

export interface IProduct extends Document {
    name: string,
    slug: string,
    description: string,
    is_variable: boolean,
    track_quantity: boolean,
    continue_out_of_stock: boolean,
    type: number,
    category?: Types.ObjectId,
    sub_category?: Types.ObjectId,
    brand?: Types.ObjectId,
    tags?: Array<Types.ObjectId>,
    attributes?: Array<Types.ObjectId>,
    options?: Array<string>,
    status: number,
    _doc?: any
}

export interface ProductQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<IProduct>> & ProductQueryHelpers;
}

const productTypes = types.map((x: DefaultTypes) => x.value)
const statuses = productStatuses.map((x: DefaultTypes) => x.value)
export const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a product name']
        },
        slug: {
            type: String,
            required: [true, 'Please enter a slug']
        },
        description: {
            type: String,
            required: false
        },
        is_variable: {
            type: Boolean,
            required: false,
            default: false
        },
        track_quantity: {
            type: Boolean,
            required: false,
            default: true
        },
        continue_out_of_stock: {
            type: Boolean,
            required: false,
            default: true
        },
        type: {
            type: Number,
            required: [true, 'Please select product type'],
            enum: productTypes,
            validate(val: number) {
                if (!productTypes.includes(val)) throw new Error(`Type is not supported`);
            },
        },
        category: {
            type: Types.ObjectId,
            ref: Category,
        },
        sub_category: {
            type: Types.ObjectId,
            ref: SubCategory,
        },
        brand: {
            type: Types.ObjectId,
            ref: Brand,
        },
        tags: {
            type: Array<Types.ObjectId>,
            ref: Tag
        },
        attributes: {
            type: Array<Types.ObjectId>,
            ref: Attribute
        },
        image: {
            type: String,
            required: false
        },
        options: {
            type: Array<String>,
            required: false
        },
        status: {
            type: Number,
            enum: statuses,
            required: false,
            validate(val: number) {
                if (!statuses.includes(val)) throw new Error(`Product status is not supported`);
            },
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
)

productSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}

export const Product = model<IProduct, ProductQueryHelpers>('Product', productSchema)

