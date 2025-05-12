import type {
	MutationDeleteTaskArgs,
	MutationUpdateTaskArgs,
	QueryGetTaskByIdArgs,
} from "@/types/gql.type";
import { TaskService } from "@/services/task.service";
import { ITaskDocument } from "@/types/task.type";
import { Types } from "mongoose";

export default {
	Query: {
		getTaskById(_: any, { id }: QueryGetTaskByIdArgs) {
			return TaskService.getTaskById({ id });
		},
	},

	Mutation: {

		updateTask(_: any, { id, taskData }: MutationUpdateTaskArgs) {
			return TaskService.updateTask({ ...taskData, id });
		},

		deleteTask(_: any, { id }: MutationDeleteTaskArgs) {
			return TaskService.deleteTask({ id });
		},
	},

	Task: {
		id: (parent: ITaskDocument) => {
			return (parent._id as Types.ObjectId).toString();
		},
	},
};
