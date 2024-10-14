import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface DataUserType {
	name: string;
	surname: string;
	userName: string;
	emailAddress: string;
	allowedLeaveDay: number;
	type: number;
	level: number;
	sex: number;
	branch: number;
	avatarPath: string;
	avatarFullPath: string;
	morningWorking: string;
	morningStartAt: string;
	morningEndAt: string;
	afternoonWorking: string;
	afternoonStartAt: string;
	afternoonEndAt: string;
	isWorkingTimeDefault: true;
	branchId: number;
	id: number;
}

// Type state

interface UsersState {
	entities: DataUserType | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UsersState = {
	entities: null,
	loading: "idle"
};

// Fetch

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await instance.get(API_END_POINT.API_CURRENT_USER);
	return response.data.result.user;
});

// Slice
const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.entities = action.payload;
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.loading = "failed";
			});
	}
});

export default userSlice.reducer;
