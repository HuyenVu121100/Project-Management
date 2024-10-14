import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ClientType {
	name: string;
	code: string;
	id: number;
}

// Type state
interface ClientsState {
	entities: ClientType[] | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ClientsState = {
	entities: null,
	loading: "idle"
};

// Fetch
export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
	const response = await instance.get(API_END_POINT.API_CUSTOMER_GET_ALL);
	return response.data.result;
});

// Slice
const clientSlice = createSlice({
	name: "clients",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(fetchClients.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.entities = action.payload;
			})
			.addCase(fetchClients.rejected, (state) => {
				state.loading = "failed";
			});
	}
});

export default clientSlice.reducer;
