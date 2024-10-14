import { Button, List } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faChartSimple,
	faClock,
	faCalendarDays,
	faCalendarXmark,
	faCalendar,
	faCheck,
	faPeopleGroup,
	faUserGroup,
	faMessage,
	faFile
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { User } from "../../Header/User/User";
import styles from "../Main.module.css";

const buttonData = [
	{ text: "My profile", icon: faUser },
	{ text: "Admin", icon: faClock },
	{ text: "Project", icon: faClock, link: "/home/project" },
	{ text: "My timesheet", icon: faChartSimple, link: "/home/managertask" },
	{ text: "My request off/on/on site", icon: faClock },
	{ text: "My working time", icon: faCalendarDays },
	{ text: "Manage timesheet", icon: faCalendarXmark },
	{ text: "Manage request off/remote/onsite", icon: faCalendar },
	{ text: "Manager working time", icon: faCheck },
	{ text: "Team working calendar", icon: faPeopleGroup },
	{ text: "Timesheet monitor", icon: faUserGroup },
	{ text: "Retro", icon: faCalendar },
	{ text: "Review intern", icon: faMessage },
	{ text: "Report", icon: faFile }
];

const ListButton = (): JSX.Element => {
	return (
		<List>
			<div className="user">
				<User />
			</div>
			<div className="sidebar">
				<div className={styles["sidebar-child"]}>
					{buttonData.map((button, index) => (
						<div key={index} style={{ display: "flex", alignItems: "center" }}>
							<FontAwesomeIcon className={styles["icon-font-awesome"]} icon={button.icon} />
							{button.link != null ? (
								<Link to={button.link} style={{ textDecoration: "none", width: "100%" }}>
									<Button className="sidebar-button">
										<span className="button-text">{button.text}</span>
									</Button>
								</Link>
							) : (
								<Button className="sidebar-button">
									<span className="button-text">{button.text}</span>
								</Button>
							)}
						</div>
					))}
				</div>
			</div>
		</List>
	);
};

export default ListButton;
