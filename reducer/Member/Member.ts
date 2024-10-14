import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Member {
	[x: string]: any;
	name: string;
	emailAddress: string;
	isActive: true;
	type: number;
	jobTitle: string;
	level: number;
	userCode: string;
	avatarPath: string;
	avatarFullPath: string;
	branch: number;
	branchColor: string;
	branchDisplayName: string;
	branchId: number;
	positionId: number;
	positionName: string;
	id: number;
}

// Type state
interface MembersState {
	entities: Member[];
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: MembersState = {
	entities: [],
	loading: "idle"
};

// Fetch members
export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
	const response = await instance.get(API_END_POINT.API_GET_MEMBER);
	return response.data.result;
});

// Slice
const memberSlice = createSlice({
	name: "members",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMembers.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchMembers.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.entities = action.payload;
			})
			.addCase(fetchMembers.rejected, (state) => {
				state.loading = "failed";
			});
	}
});

export default memberSlice.reducer;
