import { Schema, Types, model } from 'mongoose'
import { types } from '../utils/constant'
import { DefaultTypes } from '../types/'
import { Category } from './categories'
import { SubCategory } from './subCategories'
import { Brand } from './brands'
import { Tag } from './tags'

export interface IProduct extends Document {
    name: string,
    slug: string,
    description: string,
    is_variable: boolean,
    track_quantity: boolean,
    continue_out_of_stock: boolean,
    type: number,
    category: Types.ObjectId,
    sub_category: Types.ObjectId,
    brand: Types.ObjectId,
    tags: Array<Types.ObjectId>,
    _doc: any
}

const productTypes = types.map((x: DefaultTypes) => x.value)
const productSchema = new Schema(
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
            required: [true, 'Category is required']
        },
        sub_category: {
            type: Types.ObjectId,
            ref: SubCategory,
            required: [true, 'Sub category is required']
        },
        brand: {
            type: Types.ObjectId,
            ref: Brand,
            required: [true, 'Brand is required']
        },
        tags: {
            type: Array<Types.ObjectId>,
            ref: Tag,
            required: [true, 'Brand is required']
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
)

export const Product = model<IProduct>('Products', productSchema)

