import React from "react";
import Header from "../../layout/Header/Header";
import "./Home.css";
import { Grid, Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Outlet } from "react-router-dom";
import ListButton from "../../layout/Main/Sidebar/ListButton";
import DataGetFromApi from "../../context/GetDataFromApi/DataGetFromApiProvider";
import { SaveProjectProvider } from "../../context/SaveProjectProvider/ProjectContext";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary
}));

const Home: React.FC = () => {
	return (
		<>
			<DataGetFromApi>
				<SaveProjectProvider>
					<Header />
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							<Hidden mdDown>
								<Grid item xs={12} md={3}>
									<Item className="item-home">
										<ListButton />
									</Item>
								</Grid>
							</Hidden>
							<Grid item xs={12} md={9} className="main">
								<Item>
									<Outlet />
								</Item>
							</Grid>
						</Grid>
					</Box>
				</SaveProjectProvider>
			</DataGetFromApi>
		</>
	);
};

export default Home;
