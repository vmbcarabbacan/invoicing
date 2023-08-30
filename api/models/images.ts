import { Schema, Types, model } from 'mongoose'

export interface IImage extends Document {
    name: string,
    alt: string,
    slug: string
    _any: any
}

const imageSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name']
        },
        alt: {
            type: String,
            required: false
        },
        slug: {
            type: String,
            required: true
        }
    }, {
        versionKey: false,
        timestamps: true
    }
)

export const Image = model<IImage>('Images', imageSchema)