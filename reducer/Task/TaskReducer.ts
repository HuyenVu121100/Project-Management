import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

const SET_DATA_TASK = "SET_DATA_TASK";
export const TOGGLE_TASK_STATUS = "TOGGLE_TASK_STATUS";

export interface SetTaskAction {
	type: typeof SET_DATA_TASK;
	payload: TaskType[];
}

export interface ToggleTaskStatusAction {
	type: typeof TOGGLE_TASK_STATUS;
	payload: number;
}

export type DataTaskActions = SetTaskAction | ToggleTaskStatusAction;

export interface TaskType {
	name: string;
	type: number;
	isDeleted: boolean;
	id: number;
}

interface DataTaskState {
	dataTask: TaskType[] | null;
}

const initialState: DataTaskState = {
	dataTask: null
};

export const fetchTask = createAsyncThunk("members/fetchMembers", async () => {
	const response = await instance.get(API_END_POINT.API_GET_MEMBER);
	return response.data.result;
});

const dataTaskReducer = (state = initialState, action: DataTaskActions): DataTaskState => {
	switch (action.type) {
		case SET_DATA_TASK:
			return { ...state, dataTask: action.payload };
		case TOGGLE_TASK_STATUS:
			return {
				...state,
				dataTask:
					state.dataTask != null
						? state.dataTask.map((task) => (task.id === action.payload ? { ...task, isDeleted: !task.isDeleted } : task))
						: []
			};
		default:
			return state;
	}
};

export const setDataTask = (dataTask: TaskType[]): SetTaskAction => ({
	type: SET_DATA_TASK,
	payload: dataTask
});

export const toggleTaskStatus = (id: number): ToggleTaskStatusAction => ({
	type: TOGGLE_TASK_STATUS,
	payload: id
});

export default dataTaskReducer;
export { SET_DATA_TASK };
