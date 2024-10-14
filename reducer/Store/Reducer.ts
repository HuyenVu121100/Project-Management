import { combineReducers } from "redux";
import authReducer from "../Auth/Auth";
import dataTaskReducer from "../Task/TaskReducer";
import userReducer from "../User/UserSlice";
import projectReducer from "../Project/ProjectSlice";
import branchReducer from "../Branch/Branch";
import clientReducer from "../Customer/Customer";
import memberReducer from "../Member/Member";

const rootReducer = combineReducers({
	auth: authReducer,
	dataTask: dataTaskReducer,
	users: userReducer,
	project: projectReducer,
	branch: branchReducer,
	client: clientReducer,
	member: memberReducer
});

export default rootReducer;
