import { genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";
import type { IUserDocument } from "@/types/user.type";

const UserSchema: Schema<IUserDocument> = new Schema({
    fName: { type: String, required: true, minlength: 3, maxlength: 25, trim: true, lowercase: true },
    lName: { type: String, maxLength: 25, default: "", trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true, minLength: 8, },
    isActive: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, default: false }
},
    { versionKey: false }
);


UserSchema.pre<IUserDocument>("save", async function () {

    if (this.isModified("isVerified") && !this.isNew) {

        if (this.isVerified === false) {
            this.isVerified = true;
        }
    }

    if (this.isModified("password")) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    };


})

export const UserModel = model<IUserDocument>("User", UserSchema);
