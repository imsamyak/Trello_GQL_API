import type {
	List,
	MutationAddTaskArgs,
	MutationDeleteListArgs,
	MutationUpdateListArgs,
	QueryGetListByIdArgs,
} from "@/types/gql.type";
import { ListService } from "@/services/list.service";
import { IListDocument } from "@/types/list.type";
import { Types } from "mongoose";

export default {
	Query: {
		getListById(_: any, { id }: QueryGetListByIdArgs) {
			return ListService.getListById({ id });
		},
	},

	Mutation: {
		updateList(_: any, { id, listData }: MutationUpdateListArgs) {
			return ListService.updateList({
				...listData,
				id,
			});
		},

		deleteList(_: any, { id }: MutationDeleteListArgs) {
			return ListService.deleteList({ id });
		},

		addTask(_: any, { id, taskData }: MutationAddTaskArgs) {
			return ListService.addTask({ id }, taskData);
		},
	},

	List: {
		tasks: ({ id }: List) => {
			return ListService.getTasksOfList({ id });
		},

		id: (parent: IListDocument) => {
			return (parent._id as Types.ObjectId).toString();
		},
	},
};
