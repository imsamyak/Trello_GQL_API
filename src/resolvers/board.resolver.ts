import type {
	Board,
	MutationAddListArgs,
	MutationCreateBoardArgs,
	MutationDeleteBoardArgs,
	MutationUpdateBoardAccessArgs,
	MutationUpdateBoardArgs,
	QueryGetBoardByIdArgs,
} from "@/types/gql.type";
import { AccessService } from "@/services/access.service";
import { BoardService } from "@/services/board.service";
import { IBoardDocument } from "@/types/board.type";
import { Types } from "mongoose";

export default {
	Query: {
		getBoardById(_: any, { id }: QueryGetBoardByIdArgs) {
			return BoardService.getBoardById({ id });
		},
	},

	Mutation: {
		createBoard(_: any, { boardData }: MutationCreateBoardArgs) {
			return BoardService.createBoard(boardData);
		},

		updateBoard(_: any, { boardData }: MutationUpdateBoardArgs) {
			return BoardService.updateBoard(boardData);
		},

		deleteBoard(_: any, { id }: MutationDeleteBoardArgs) {
			return BoardService.deleteBoard({ id });
		},

		addList(_: any, { id, listData }: MutationAddListArgs) {
			return BoardService.addList({ id }, listData);
		},


		updateBoardAccess(_:any, {boardId, access}: MutationUpdateBoardAccessArgs){
			return AccessService.updateAccess({id: boardId}, access)
		}
	},

	Board: {
		users({ id }: Board) {
			return AccessService.getUsersOfBoard({ id });
		},

		lists({ id }: Board) {
			return BoardService.getListsOfBoard({ id });
		},

		id: (parent: IBoardDocument) => {
			return (parent._id as Types.ObjectId).toString();
		},
	},
};
