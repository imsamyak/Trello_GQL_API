import type {
	MutationCreateUserArgs,
	MutationDeleteUserArgs,
	MutationUpdateUserArgs,
	QueryGetUserByEmailArgs,
	QueryGetUserByIdArgs,
	User,
} from '@/types/gql.type';
import { AccessService } from '@/services/access.service';
import { UserService } from '@/services/user.service';
import { BadRequestError } from '@/utils/errors';
import type { IUserDocument } from '@/types/user.type';
import type { Types } from 'mongoose';

export default {
	Query: {
		async getUserById(_: any, { id }: QueryGetUserByIdArgs) {
			
			return await UserService.getUserById({ id });
		},

		async getUserByEmail(_: any, { email }: QueryGetUserByEmailArgs) {

			console.log("REQ Received");
			return await UserService.getUserByEmail({ email });
		},
	},

	Mutation: {
		async createUser(_: any, { userData }: MutationCreateUserArgs) {
			return await UserService.createUser(userData);
		},

		async updateUser(_: any, { email, id, userData }: MutationUpdateUserArgs) {
			
			if (id !== undefined && email !== undefined) {
				throw new BadRequestError('Only one of "id" or "email" should be provided, not both.');
			}
		
			if (id !== undefined) {
				return await UserService.updateUserById({ ...userData, id });
			} else if (email !== undefined) {
				return await UserService.updateUserByEmail({ ...userData, email });
			}
		
			throw new BadRequestError('Either "id" or "email" must be provided to update the user.');
		},		

		async deleteUser(_: any, { id }: MutationDeleteUserArgs) {
			return await UserService.deleteUser({ id });
		},
	},

	User: {
		boards: async ({ id }: User)=> {
			return await AccessService.getBoardsOfUser({ id });
		},

		id: (parent: IUserDocument)=>{
			return (parent._id as Types.ObjectId).toString();
		}
	},
};
