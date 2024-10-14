import React, { useEffect, useContext, useCallback, useMemo, useState } from "react";
import { Member } from "../../../../../../context/SaveProjectProvider/Type";
import { Paper, styled } from "@mui/material";
import SaveProjectContext from "../../../../../../context/SaveProjectProvider/ProjectContext";
import styles from "./AddMem.module.css";
import { Virtuoso } from "react-virtuoso";
import Avata from "../../../../../../asset/285ce8115100471.6047eaa30896a.jpg";
import { toast } from "react-toastify";
import Branch from "../Filter/Branch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../reducer/Store/Store";
import SearchFromListInit from "../Search/SearchFromListInit";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary
}));

const Push: React.FC = (): JSX.Element => {
	const { setUsers, arrayGet, setArrayGet, setArray, array } = useContext(SaveProjectContext);
	const member = useSelector((state: RootState) => state.member.entities);

	useEffect(() => {
		setArray(member);
	}, [member, setArray]);

	useEffect(() => {
		const updatedUsers = arrayGet.map((item: Member) => ({
			userId: item.id,
			type: Number(item.positionId),
			isTemp: item.isTemp
		}));
		setUsers(updatedUsers);
	}, [arrayGet, setUsers]);

	const [isTemp, setIsTemp] = useState<boolean>(false);

	const memoizedArray = useMemo(() => array, [array]);

	const handleClick = useCallback(
		(item: Member): void => {
			setIsTemp(false);
			const isItemExist = arrayGet.some((i) => i.id === item.id);

			if (isItemExist) {
				toast.error("User is exist");
				return;
			}

			const newArray = array.filter((i) => i.id !== item.id);
			if (newArray.length !== array.length) {
				setArray(newArray);
			}
			setArrayGet([...arrayGet, { ...item, isTemp }]);
		},
		[array, arrayGet, isTemp, setArray, setArrayGet]
	);

	const renderItem = useCallback(
		(index: number, item: Member) => (
			<div
				className={styles["mem-container"]}
				key={item.id}
				onClick={() => handleClick(item)}
				style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}
			>
				<div className={styles["mem-avata"]}>
					<img
						style={{ width: "3em", borderRadius: "50%" }}
						src={item.avatarFullPath}
						onError={({ currentTarget }) => {
							currentTarget.src = Avata;
						}}
						alt="Avatar"
					/>
				</div>
				<div style={{ marginLeft: "8px" }}>
					<div className={styles["mem-name"]}>
						<div className={styles["mem-name-item"]}>{item.name}</div>
						<div className={styles["mem-position-item"]}>{item.positionName}</div>
						<div className={styles["mem-branch-item"]}>{item.branchDisplayName}</div>
					</div>
					<div className={styles.email}>{item.emailAddress}</div>
				</div>
			</div>
		),
		[handleClick]
	);

	return (
		<>
			<div style={{ display: "flex" }}>
				<Branch />
				<SearchFromListInit />
			</div>
			<div className={styles["push-container-init"]}>
				<div style={{ width: "100%", paddingTop: "18px" }}>
					<Item>
						<div className={styles["mem-scroll"]}>
							<Virtuoso data={memoizedArray} itemContent={renderItem} style={{ height: "100vh", width: "100%" }} />
						</div>
					</Item>
				</div>
			</div>
		</>
	);
};

export default Push;
