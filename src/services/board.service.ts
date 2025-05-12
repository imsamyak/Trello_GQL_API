import { startSession } from "mongoose";
import { BoardModel } from "@/models/board.model";
import { ListModel } from "@/models/list.model";
import type { IBoard } from "@/types/board.type";
import type { IList } from "@/types/list.type";
import { NotFoundError } from "@/utils/errors";
import { inputValidator } from "@/utils/input-validator";
import { BoardValidation } from "@/validators/board.validatior";
import { ListValidation } from "@/validators/list.validator";
import { IUser } from "@/types/user.type";
 
export class BoardService {

    static async getBoardById({ id }: Pick<IBoard, "id">) {

        const data = inputValidator(BoardValidation.pick({ id: true }), { id });

        const board = await BoardModel.findById(data.id);

        if (!board) {
            throw new NotFoundError(`Board with id ${id} doesn't exists`);
        }

        return board;
    }

    static async createBoard(boardData: Omit<IBoard, "id">) {

        const data = inputValidator(BoardValidation.omit({ id: true }), boardData);

        const board = await new BoardModel(data).save();
        return board;
    }

    static async updateBoard(boardData: Partial<IBoard> & Pick<IBoard, "id">) {

        const { id, ...update } = inputValidator(BoardValidation.partial(), boardData);

        const board = await BoardModel.findByIdAndUpdate(id, update);

        if (!board) {
            throw new NotFoundError(`Board with id ${id} doesn't exists`);
        }

        return board;
    }

    static async deleteBoard({ id }: Pick<IBoard, "id">) {

        const data = inputValidator(BoardValidation.pick({ id: true }), { id });

        const board = await BoardModel.findByIdAndDelete(data.id);

        if (!board) {
            throw new NotFoundError(`Board with id ${id} doesn't exists`);
        }

        return board;
    }

    static async getListsOfBoard({ id }: Pick<IBoard, "id">) {

        const lists = await ListModel.find({ board: id }).lean();
        return lists;
    }

    static async addList({ id }: Pick<IBoard, "id">, listData: Partial<IList>) {

        const { id: boardId } = inputValidator(BoardValidation.pick({ id: true }), { id });

        const data = inputValidator(ListValidation.omit({ id: true }), listData);

        const session = await startSession();

        try {
            session.startTransaction();

            const board = await BoardModel.findById(boardId);

            if (!board) {
                throw new NotFoundError(`Board with id ${boardId} doesn't exists`);
            }

            const order = board.listCount.valueOf();
            board.listCount = order + 1;
            await board.save();

            const list = await new ListModel({
                ...data,
                board: boardId,
                order
            }).save();

            await session.commitTransaction();
            return list;

        }catch(err){

            await session.abortTransaction();
            throw err;

        }finally {

            await session.endSession();
        }  
    }

	
}