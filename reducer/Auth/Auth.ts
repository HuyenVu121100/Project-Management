export const SET_TOKEN = "SET_TOKEN";
export const SET_ERROR = "SET_ERROR";
export interface SetTokenAction {
	type: typeof SET_TOKEN;
	payload: string;
}

export interface SetErrorAction {
	type: typeof SET_ERROR;
	payload: string;
}

export type AuthActionTypes = SetTokenAction | SetErrorAction;

interface AuthState {
	token: string | null;
	error: string | null;
}

const initialState: AuthState = {
	token: null,
	error: null
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload, error: null };
		case SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default authReducer;

export const setToken = (token: string): SetTokenAction => ({
	type: SET_TOKEN,
	payload: token
});

export const setError = (error: string): SetErrorAction => ({
	type: SET_ERROR,
	payload: error
});
