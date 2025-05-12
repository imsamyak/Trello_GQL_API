import { UserModel } from "@/models/user.model";
import type { IUser } from "@/types/user.type";
import { BadRequestError, NotFoundError } from "@/utils/errors";
import { inputValidator } from "@/utils/input-validator";
import { UserValidation } from "@/validators/user.validator";

export class UserService {
	static async getUserById({ id }: { id: string }) {
		const data = inputValidator(UserValidation.pick({ id: true }), { id });

		const user = await UserModel.findById(data.id);

		if (!user) {
			console.log("User not found");
			throw new NotFoundError(
				`User with email ${data.id} doesn't exists`
			);
		}

		return user;
	}

	static async getUserByEmail({ email }: Pick<IUser, "email">) {
		const data = inputValidator(UserValidation.pick({ email: true }), {
			email,
		});

		const user = await UserModel.findOne({ email: data.email }).lean();

		if (!user) {
			console.log("User not found");
			throw new NotFoundError(
				`User with email ${data.email} doesn't exists`
			);
		}

		return user;
	}

	static async createUser(
		userData: Pick<IUser, "fName" | "lName" | "email" | "password">
	) {
		const data = inputValidator(UserValidation.omit({ id: true }), userData);

		const isExists = await UserModel.findOne({email: data.email}) ? true: false;

		if(isExists){
			throw new BadRequestError(`User with email ${data.email} already exists`);
		}

		const user = await new UserModel(data).save();

		return user;
	}

	static async updateUserById(
		userData: Pick<IUser, "id"> & Partial<Omit<IUser, "id" | "email">>
	) {
		const { id, ...update } = inputValidator(
			UserValidation.partial(),
			userData
		);

		const user = await UserModel.findByIdAndUpdate(id, update);
		if (!user) throw new NotFoundError(`User with id ${id} doesn't exists`);

		return user;
	}

	static async updateUserByEmail(
		userData: Pick<IUser, "email"> & Partial<Omit<IUser, "id" | "email">>
	) {
		const { email, ...update } = inputValidator(
			UserValidation.partial(),
			userData
		);

		const user = await UserModel.findOneAndUpdate({ email }, update);
		if (!user)
			throw new NotFoundError(`User with email ${email} doesn't exists`);

		return user;
	}

	static async deleteUser({ id }: Pick<IUser, "id">) {
		const data = inputValidator(UserValidation.pick({ id: true }), { id });

		const user = await UserModel.findByIdAndDelete(data.id);

		if (!user) {
			throw new NotFoundError(`User with id ${data.id} doesn't exists`);
		}

		return user;
	}
}
