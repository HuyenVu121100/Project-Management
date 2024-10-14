import { useCallback, useContext } from "react";
import { Member } from "../../../../../../context/SaveProjectProvider/Type";
import styles from "./AddMem.module.css";
import { FormControl, MenuItem, Paper, Select, styled, useMediaQuery, useTheme } from "@mui/material";
import SaveProjectContext from "../../../../../../context/SaveProjectProvider/ProjectContext";
import AvataDefault from "../../../../../../asset/285ce8115100471.6047eaa30896a.jpg";

interface GetMemberProps {
	open: boolean;
}

const GetMember = ({ open }: GetMemberProps): JSX.Element => {
	const { arrayGet, array, setArrayGet, setArray } = useContext(SaveProjectContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleReverseClick = (item: Member): void => {
		setArray([item, ...array]);
		setArrayGet(arrayGet.filter((i) => i.id !== item.id));
	};

	const handlePositionChange = (id: number, newPositionId: any): void => {
		setArrayGet(arrayGet.map((i) => (i.id === id ? { ...i, positionId: newPositionId } : i)));
	};

	const handleTempChange = (id: any, newIsTemp: boolean): void => {
		setArrayGet(arrayGet.map((i) => (i.id === id ? { ...i, isTemp: newIsTemp } : i)));
	};

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		width: "100%",
		color: theme.palette.text.secondary
	}));

	const positionObject = [
		{ id: "1", name: "PM" },
		{ id: "2", name: "Member" },
		{ id: "3", name: "Shadow" },
		{ id: "4", name: "Deactive" }
	];

	const renderMemberList = useCallback(() => {
		return (
			<div className={styles["mem-scroll"]}>
				{arrayGet.map((item, index) => (
					<div key={item.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
						<div className={styles["get-mem-wrap"]}>
							<div onClick={() => handleReverseClick(item)} className={styles["mem-container"]}>
								<div className={styles["mem-avata"]}>
									<img
										className={styles["mem-avata-child"]}
										style={{ width: "3em", borderRadius: "50%" }}
										src={item.avatarFullPath}
										onError={({ currentTarget }) => {
											currentTarget.src = AvataDefault;
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
									<div className={styles["mem-email"]}>{item.emailAddress}</div>
								</div>
							</div>
						</div>

						<div className={styles["position-isTemp-wrap"]}>
							<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
								<Select
									labelId="position-label"
									id="position-select"
									value={item.positionId ?? ""}
									onChange={(e) => handlePositionChange(item.id, e.target.value)}
								>
									{positionObject.map((pos) => (
										<MenuItem key={pos.id} value={pos.id}>
											{pos.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl variant="standard" sx={{ m: 1, minWidth: 10 }}>
								<Select
									labelId="temp-label"
									id="temp-select"
									value={item.isTemp === true ? "temp" : "official"}
									onChange={(e) => handleTempChange(item.id, e.target.value === "temp")}
								>
									<MenuItem value="temp">Temporary</MenuItem>
									<MenuItem value="official">Official</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>
				))}
			</div>
		);
	}, [arrayGet, handlePositionChange, handleReverseClick, handleTempChange]);

	const renderMemberListResponsive = (): JSX.Element => (
		<div style={{ display: "flex", overflowX: "auto" }}>
			{arrayGet.map((item, index) => (
				<div key={item.id} style={{ display: "flex", width: "80px", backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
					<div onClick={() => handleReverseClick(item)} className={styles["mem-container-reponsive"]}>
						<div className={styles["mem-avata-reponsive"]}>
							<img
								style={{ width: "3em", borderRadius: "50%" }}
								src={item.avatarFullPath}
								onError={({ currentTarget }) => {
									currentTarget.src = AvataDefault;
								}}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);

	if (arrayGet.length <= 0) {
		return (
			<div className={styles["push-container"]}>
				<Item>
					<p>No member selected</p>
				</Item>
			</div>
		);
	}

	return (
		<div className={styles["push-container"]}>
			<Item>{isMobile ? (open ? renderMemberListResponsive() : renderMemberList()) : renderMemberList()}</Item>
		</div>
	);
};

export default GetMember;
