import { startSession } from "mongoose";
import { ListModel } from "@/models/list.model";
import { TaskModel } from "@/models/task.model";
import type { IList } from "@/types/list.type";
import { NotFoundError } from "@/utils/errors";
import { inputValidator } from "@/utils/input-validator";
import { ListValidation } from "@/validators/list.validator";
import { TaskValidation } from "@/validators/task.validator";

export class ListService {
	static async getListById({ id }: Pick<IList, "id">) {
		const data = inputValidator(ListValidation.pick({ id: true }), { id });

		const list = await ListModel.findById(data.id).populate("board");

		if (!list) {
			throw new NotFoundError(`List with id ${id} doesn't exists`);
		}

		return list;
	}

	static async updateList(listData: Partial<IList> & Pick<IList, "id">) {
		const { id, ...update } = inputValidator(
			ListValidation.partial(),
			listData
		);

		const list = await ListModel.findByIdAndUpdate(id, update);

		if (!list) {
			throw new NotFoundError(`List with id ${id} doesn't exists`);
		}

		return list;
	}

	static async deleteList({ id }: Pick<IList, "id">) {
		const data = inputValidator(ListValidation.pick({ id: true }), { id });

		const list = await ListModel.findByIdAndDelete(data.id);

		if (!list) {
			throw new NotFoundError(`List with id ${id} doesn't exists`);
		}

		return list;
	}

	static async getTasksOfList({ id }: Pick<IList, "id">) {
		const tasks = await TaskModel.find({ list: id }).lean();
		return tasks;
	}

	static async addTask(
		{ id }: Pick<IList, "id">,
		taskData: Omit<IList, "id">
	) {
		const { id: listId } = inputValidator(ListValidation.pick({ id: true }), {
			id,
		});
		const data = inputValidator(TaskValidation.partial(), taskData);

		const session = await startSession();

		try {
			session.startTransaction();

			const list = await ListModel.findById(listId);

			if (!list) {
				throw new NotFoundError(`List with id ${listId} doesn't exists`);
			}

			const order = list.tasksCount.valueOf();
			list.tasksCount = order + 1;
			await list.save();

			const task = await new TaskModel({
				...data,
				list: listId,
				order,
			}).save();

			await session.commitTransaction();
			return task;
		} catch (err) {
			await session.abortTransaction();
			throw err;
		} finally {
			await session.endSession();
		}
	}
}
