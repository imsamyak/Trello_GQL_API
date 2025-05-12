import { TaskModel } from "@/models/task.model";
import type { ITask } from "@/types/task.type";
import { NotFoundError } from "@/utils/errors";
import { inputValidator } from "@/utils/input-validator";
import { TaskValidation } from "@/validators/task.validator";

export class TaskService {

    static async getTaskById({ id }: Pick<ITask, "id">) {

        const data = inputValidator(TaskValidation.pick({ id: true }), { id });

        const task = await TaskModel.findById(data.id);

        if (!task) {
            throw new NotFoundError(`Task with id ${id} doesn't exists`);
        }

        return task;
    }

    static async updateTask(taskData: Partial<ITask> & Pick<ITask, "id">) {

        const { id, ...update } = inputValidator(TaskValidation.partial(), taskData);

        const task = await TaskModel.findByIdAndUpdate(id, update);

        if (!task) {
            throw new NotFoundError(`Task with id ${id} doesn't exists`);
        }

        return task;
    }

    static async deleteTask({ id }: Pick<ITask, "id">) {

        const data = inputValidator(TaskValidation.pick({ id: true }), { id });

        const task = await TaskModel.findByIdAndDelete(data.id);

        if (!task) {
            throw new NotFoundError(`Task with id ${id} doesn't exists`);
        }

        return task;
    }
}