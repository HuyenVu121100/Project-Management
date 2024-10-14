import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { TaskPost, User } from "./Type";

const SaveProject = async (
	id: number,
	name: string,
	code: string,
	customerId: number,
	timeStart: string,
	timeEnd: string,
	note: string,
	projectType: number,
	status: number,
	tasks: TaskPost[],
	users: User[]
): Promise<any> => {
	const postData = {
		id,
		name,
		code,
		customerId,
		timeStart,
		timeEnd,
		note,
		projectType,
		status,
		tasks,
		users
	};
	const response = await instance.post(API_END_POINT.API_PROJECT_SAVE, postData);
	return response;
};

export default SaveProject;
