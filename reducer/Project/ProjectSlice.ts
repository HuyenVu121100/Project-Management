import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { ProjectTargetUser, TaskPost, User } from "../../context/SaveProjectProvider/Type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface for Project
export interface ProjectType {
	customerName: string;
	name: string;
	code: string;
	status: number;
	pms: string[];
	activeMember: number;
	projectType: number;
	timeStart: string;
	timeEnd: string;
	id: number;
	note: string;
}

// interface for ProjectById
export interface ProjectByIdType {
	name: string;
	code: string;
	timeStart: string;
	timeEnd: string;
	note: string | null;
	projectType: number;
	customerId: number;
	users: User[];
	projectTargetUsers: ProjectTargetUser[];
	komuChannelId: string | null;
	isNotifyToKomu: boolean;
	isNoticeKMSubmitTS: boolean;
	isNoticeKMRequestOffDate: boolean;
	isNoticeKMApproveRequestOffDate: boolean;
	isNoticeKMRequestChangeWorkingTime: boolean;
	isNoticeKMApproveChangeWorkingTime: boolean;
	isAllUserBelongTo: boolean;
	id: number;
	status: number;
	tasks: TaskPost[];
}

interface ProjectStateType {
	project: ProjectType[] | null;
	projectById: ProjectByIdType | null;
	close: null;
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ProjectStateType = {
	project: null,
	projectById: null,
	close: null,
	loading: "idle"
};

// Fetch project
export const fetchProject = createAsyncThunk("project/fetchProject", async () => {
	const response = await instance.get(API_END_POINT.API_PROJECT_GET_ALL);
	return response.data.result;
});

// Fetch project by ID
export const fetchProjectById = createAsyncThunk("project/fetchProjectById", async (id: number) => {
	const response = await instance.get(`${API_END_POINT.API_GET_BY_ID}?input=${id}`);
	return response.data.result;
});

// Slice
const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		resetProjectById: (state) => {
			state.projectById = null;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchProject.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchProject.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.project = action.payload;
			})
			.addCase(fetchProject.rejected, (state) => {
				state.loading = "failed";
			})
			.addCase(fetchProjectById.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.projectById = action.payload;
			});
	}
});

export default projectSlice.reducer;
export const { resetProjectById } = projectSlice.actions;
