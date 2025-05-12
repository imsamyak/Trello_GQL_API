import { AccessModel } from "@/models/access.model";
import { BoardModel } from "@/models/board.model";
import { UserModel } from "@/models/user.model";
import { AccessUpdate } from "@/types/access.type";
import type { IBoard } from "@/types/board.type";
import type { IUser } from "@/types/user.type";
import { UserRole } from "@/utils/constants";
import { BadRequestError } from "@/utils/errors";
import { Types } from "mongoose";

export class AccessService {
	static async getUsersOfBoard({ id }: Pick<IBoard, "id">) {
		const users = await AccessModel.find({ board: id })
			.select("user role")
			.populate("user")
			.lean();

		return users;
	}

	static async getBoardsOfUser({ id }: Pick<IUser, "id">) {
		const boards = await AccessModel.find({ user: id })
			.select("board role")
			.populate("board")
			.lean();

		return boards;
	}

	static async updateAccess(
		{ id: boardId }: Pick<IBoard, "id">,
		accessUpdate: Array<AccessUpdate>
	) {
		const board = await BoardModel.findById(boardId);
		if (!board) {
			throw new BadRequestError(`Board with id ${boardId} doesn't exist`);
		}
	
		const seen = new Set<string>();
		for (const { user: userId } of accessUpdate) {
			if (seen.has(userId.toString())) {
				throw new BadRequestError(`Multiple access entries for user ${userId}`);
			}
			seen.add(userId.toString());
		}
	
		const userChecks = await Promise.all(
			accessUpdate.map(({ user: userId }) => UserModel.exists({ _id: userId }))
		);
	
		userChecks.forEach((exists, i) => {
			if (!exists) {
				throw new BadRequestError(`User with id ${accessUpdate[i].user} doesn't exist`);
			}
		});
	
		const bulkOps = accessUpdate.map(({ user: userId, role }) => {
			if (role === null || role === undefined) {
				return {
					deleteOne: {
						filter: { board: boardId, user: userId },
					},
				};
			} else {
				return {
					updateOne: {
						filter: { board: boardId, user: userId },
						update: { $set: { role } },
						upsert: true,
					},
				};
			}
		});
	
		if (bulkOps.length > 0) {
			await AccessModel.bulkWrite(bulkOps);
		}
	}
	
}
