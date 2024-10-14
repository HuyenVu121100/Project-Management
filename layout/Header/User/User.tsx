import { useDispatch, useSelector } from "react-redux";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../../reducer/Store/Store";
import { fetchUsers } from "../../../reducer/User/UserSlice";

const User: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const dataUser = useSelector((state: RootState) => state.users.entities);
	const loading = useSelector((state: RootState) => state.users.loading);

	useEffect(() => {
		void dispatch(fetchUsers());
	}, [dispatch]);

	if (loading === "pending") {
		return <p>Loading...</p>;
	}
	if (loading === "failed") {
		return <p>Error fetching data.</p>;
	}

	return (
		<ListItem alignItems="flex-start" sx={{ overflow: "hidden", padding: 0, marginRight: "5em", paddingLeft: "12px" }} className="avata">
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src={dataUser != null ? dataUser.avatarFullPath : "Loading"} />
			</ListItemAvatar>
			<ListItemText
				primary={dataUser != null ? dataUser.name : "Loading"}
				secondary={
					<React.Fragment>
						<Typography sx={{ display: "inline", fontSize: "1em", color: "white" }} component="span" variant="body2" color="text.primary">
							{dataUser != null ? dataUser.emailAddress : "Loading"}
						</Typography>
					</React.Fragment>
				}
			/>
		</ListItem>
	);
};

export { User };
