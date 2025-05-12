import type { IAccessDocument } from "@/types/access.type";
import { model, Schema } from "mongoose";

const AccessSchema: Schema<IAccessDocument> = new Schema({

    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: true,
        index: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    role: {
        type: String,
        enum: ["viewer", "editor", "admin"],
        required: true
    }
},
    { versionKey: false }
)

AccessSchema.index({ board: 1, user: 1 }, { unique: true });

export const AccessModel = model<IAccessDocument>("Access", AccessSchema);