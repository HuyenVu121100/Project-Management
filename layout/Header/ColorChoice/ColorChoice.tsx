import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./ColorChoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { ColorContext } from "../Header";

type Anchor = "right";

const ColorList = ["black", "blue", "green", "gold"];

export default function AnchorTemporaryDrawer() {
	const [state, setState] = React.useState({
		right: false
	});

	const context = React.useContext(ColorContext);

	const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: Anchor) => (
		<Box sx={{ width: 250, marginTop: "77px" }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				{ColorList.map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => context?.setColor(text)}>
							<div className={`color-${text}`}>.</div>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Box>
	);

	return (
		<div>
			<Button onClick={toggleDrawer("right", true)}>
				<FontAwesomeIcon icon={faEllipsisVertical} className="font-awsome" />
			</Button>
			<Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
				{list("right")}
			</Drawer>
		</div>
	);
}
