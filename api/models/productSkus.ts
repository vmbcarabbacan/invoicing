import { Schema, Types, model, Document, Query } from 'mongoose'
import { Product } from './products';

export interface IProductSku extends Document {
    name: string,
    product_id: Types.ObjectId,
    sku: string,
    price: number,
    quantity: number,
    images?: Array<string>,
    description?: string
}

export interface ProductSkuQueryHelpers {
    [x: string]: any;
}

export const ProductSkuSchema = new Schema(
    {
        name: String,
        product_id: {
            type: Types.ObjectId,
            ref: Product
        },
        sku: String,
        price: Number,
        quantity: Number,
        images: {
            type: Array<String>,
            required: false
        },
        description: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const ProductSku = model<IProductSku, ProductSkuQueryHelpers>('ProductSku', ProductSkuSchema)
