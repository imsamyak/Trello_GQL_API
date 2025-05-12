import { model, Schema } from "mongoose";
import type { IBoardDocument } from "@/types/board.type";

const BoardSchema: Schema<IBoardDocument> = new Schema({
    title: { 
        type: String, 
        required: true, 
        minLength: 5, 
        maxLength: 20 
    },

    description: { 
        type: String, 
        required: true, 
        maxLength: 50, 
        default: "" 
    },

    listCount: {
        type: Number,
        min: 0,
        default: 0,        
    }
},
    { versionKey: false }
)

export const BoardModel = model<IBoardDocument>("Board", BoardSchema);