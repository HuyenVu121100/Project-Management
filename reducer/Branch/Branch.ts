import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Branch {
	name: string;
	displayName: string;
	id: number;
}

// Type state
interface BranchesState {
	entities: Branch[] | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: BranchesState = {
	entities: null,
	loading: "idle"
};

// Fetch
export const fetchBranches = createAsyncThunk("branches/fetchBranches", async () => {
	const response = await instance.get(API_END_POINT.API_GET_FILTER_BRANCH);
	return response.data.result;
});

// Slice
const branchSlice = createSlice({
	name: "branches",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBranches.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchBranches.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.entities = action.payload;
			})
			.addCase(fetchBranches.rejected, (state) => {
				state.loading = "failed";
			});
	}
});

export default branchSlice.reducer;
