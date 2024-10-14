import React, { useState } from "react";
import styles from "./AddMem.module.css";
import GetMember from "./MemberGet";

import Push from "./MemberInit";
import SearchMem from "../Search/Search";
import { Button, Hidden } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddMember: React.FC = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = (): void => {
		setOpen(!open);
	};

	return (
		<div className={styles["team-container"]}>
			<div className={styles["team-wrap"]}>
				<Hidden mdDown>
					<div className={styles["header-member-project"]}>
						<div className={styles["header-wrap-search"]}>
							<input type="checkbox" id="show-deactive-member" />
							<label style={{ textWrap: "nowrap" }} htmlFor="show-deactive-member">
								Show deactive member
							</label>
						</div>
						<div style={{ display: "flex" }}>
							<input type="checkbox" id="show-inactive-user" />
							<label style={{ textWrap: "nowrap" }} htmlFor="show-inactive-user">
								Show inactive user
							</label>
						</div>
						<SearchMem />
						<div>
							<button className={styles["button-member"]} onClick={handleClickOpen} type="button">
								Add Member
							</button>
						</div>
					</div>
				</Hidden>
				<Hidden mdUp>
					<div className={styles["member-list"]}>
						<Button className={styles["button-member-icon"]} onClick={handleClickOpen} type="button">
							<FontAwesomeIcon icon={faPlus} />
						</Button>
					</div>
				</Hidden>
				<div>
					<GetMember open={open} />
				</div>
			</div>
			{open && (
				<div className={styles["push-wrap"]}>
					<Push />
				</div>
			)}
		</div>
	);
};

export default AddMember;
