import instance from "../config/AxiousConfig";
import { API_END_POINT } from "./ApiEndPoint";
import { setDataTask } from "../reducer/Task/TaskReducer";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// TaskAPI
export const fetchTaskData = async (dispatch: any): Promise<void> => {
	try {
		const response = await instance.get(API_END_POINT.API_TASK_GET_ALL);
		dispatch(setDataTask(response.data.result));
	} catch (e) {
		const error = e as AxiosError;
		throw Error(error?.message);
	}
};

interface ErrorType {
	response: {
		data: {
			error: {
				message: string;
			};
		};
	};
}

// Delete Api
export const DeleteProjectDataById = async (id: number): Promise<void> => {
	try {
		await instance.delete(`${API_END_POINT.API_DELETE_BY_ID}?Id=${id}`);
		toast.success("Delete done");
	} catch (error) {
		throw new Error((error as ErrorType).response.data.error.message);
	}
};
