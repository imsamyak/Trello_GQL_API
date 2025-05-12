import { Document } from "mongoose";

export type IBoard = {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
}

export interface IBoardDocument extends Document, Omit<IBoard, "id"> {
    listCount: Number
}