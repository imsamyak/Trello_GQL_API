import { model, Schema } from "mongoose";
import type { IListDocument } from "@/types/list.type";

const ListSchema: Schema<IListDocument> = new Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 10,
        required: true,
        default: "untitled",
        trim: true
    },

    description: {
        type: String,
        maxLength: 50,
        required: true,
        default: "",
        trim: true
    },

    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: true,
        index: true
    },

    order: {
        type: Number,
        min: 0,
        required: true,
    },

    tasksCount: {
        type: Number,
        min: 0,
        default: 0
    }
},
    { versionKey: false }
)

ListSchema.index({board: 1, order: 1}, {unique: true});

export const ListModel = model<IListDocument>("List", ListSchema);