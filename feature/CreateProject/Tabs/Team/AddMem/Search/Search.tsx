import React, { useContext, useEffect, useState } from "react";
import { ClickAwayListener, MenuList, Paper } from "@mui/material";
import { Member } from "../../../../../../context/SaveProjectProvider/Type";
import { toast } from "react-toastify";
import Avata from "../../../../../../asset/285ce8115100471.6047eaa30896a.jpg";
import SaveProjectContext from "../../../../../../context/SaveProjectProvider/ProjectContext";
import styles from "../../AddMem/ChoiceMem/AddMem.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../reducer/Store/Store";

const SearchMem = ():  JSX.Element => {
	const member = useSelector((state: RootState) => state.member.entities);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
	const [filteredData, setFilteredData] = useState<Member[]>([]);
	const [open, setOpen] = useState(false);
	const { arrayGet, setArrayGet } = useContext(SaveProjectContext);

	useEffect(() => {
		const removeAccents = (str: string): string => {
			return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		};

		const filterName = member?.filter((user) => removeAccents(user.name).toLowerCase().includes(removeAccents(searchTerm).toLowerCase()));

		setFilteredData(filterName as Member[]);
	}, [searchTerm, member]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(event.target.value);
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleUserSelect = (user: Member): void => {
		if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
			setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
		}
		const isUserInArrayGet = arrayGet.some((existingUser) => existingUser.id === user.id);

		if (isUserInArrayGet) {
			toast.error("User is already in the list.");
		} else {
			setArrayGet([...arrayGet, user]);
			handleClose();
		}
	};

	return (
		<div className={styles["search-container"]}>
			<input type="text" placeholder="Search Name" value={searchTerm} onChange={handleSearchChange} autoFocus className={styles["mem-search-input"]}  />

			<div
				id="simple-menu"
				style={{
					display: open ? "block" : "none",
					position: "absolute",
					border: "1px solid #ccc",
					backgroundColor: "#fff",
					zIndex: 1000
				}}
			>
				<ClickAwayListener onClickAway={handleClose}>
					<Paper sx={{ position: "fixed", overflowY: "auto", height: "50vh",width:"68%" }}>
						<MenuList sx={{fontSize:"10px"}}>
							{filteredData?.map((user) => (
								<div
									className={styles["mem-container"]}
									key={user.id}
									onClick={() => {
										handleUserSelect(user);
										handleClose();
									}}
								>
									<div className={styles["mem-avata"]}>
										<img
											style={{ width: "3em", borderRadius: "50%" }}
											src={user.avatarFullPath}
											onError={({ currentTarget }) => {
												currentTarget.src = Avata;
											}}
										/>
									</div>
									<div>
										<div className={styles["mem-name"]}>
											<div>{user.name}</div>
											<div>{user.positionName}</div>
											<div>{user.branchDisplayName}</div>
										</div>
										<div className="email">{user.emailAddress}</div>
									</div>
								</div>
							))}
						</MenuList>
					</Paper>
				</ClickAwayListener>
			</div>
		</div>
	);
};

export default SearchMem;
