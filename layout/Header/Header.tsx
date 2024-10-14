import "./Header.css";
import React, { useState, createContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDays, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Box, Drawer, Hidden, List, Typography } from "@mui/material";
import ListButton from "../Main/Sidebar/ListButton";
import ReusableDialog from "../../components/Modal/ArlertDialog";
import { useNavigate } from "react-router-dom";

export const ColorContext = createContext<{ color: string; setColor: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

const Header: React.FC = () => {
	const [color, setColor] = useState("header");
	const [open, setOpen] = useState(false);
	const [openDialogLogOut, setOpenDialogLogOut] = useState(false);
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};
	const navigate = useNavigate();

	const handleLogOut = (): void => {
		localStorage.removeItem("token");
		navigate("/");
	};
	const DrawerList = (
		<>
			<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
				<List>
					<ListButton />
				</List>
			</Box>
		</>
	);

	return (
		<>
			<ColorContext.Provider value={{ color, setColor }}>
				<div className={color}>
					<Hidden mdUp>
						<div>
							<div>
								<FontAwesomeIcon
									style={{
										fontSize: "30px",
										color: "#1976d2",
										marginLeft: "15px",
										marginTop: "10px"
									}}
									onClick={toggleDrawer(true)}
									icon={faBars}
								/>
								<Drawer open={open} onClose={toggleDrawer(false)}>
									{DrawerList}
								</Drawer>
							</div>
						</div>
					</Hidden>
					<Hidden mdDown>
						<div className="logo">
							<FontAwesomeIcon icon={faCalendarDays} />
						</div>
					</Hidden>
					<div className="app-name">
						<Typography>TIMESHEET</Typography>
					</div>
					<div className="logout-button">
						<FontAwesomeIcon icon={faRightFromBracket} onClick={() => setOpenDialogLogOut(true)} />
					</div>
				</div>
			</ColorContext.Provider>
			<ReusableDialog
				open={openDialogLogOut}
				onClose={() => setOpenDialogLogOut(false)}
				onAgree={handleLogOut}
				description="Do you want to logout?"
			/>
		</>
	);
};

export default Header;
