import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuList from "@mui/material/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import styles from "../ManageProject.module.css";
import { useContext, useRef, useState } from "react";
import CustomDialog from "../../../components/Modal/TabDialog";
import SaveProjectContext from "../../../context/SaveProjectProvider/ProjectContext";
import TabContent from "../../CreateProject/Tabs/TabContent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reducer/Store/Store";
import { fetchProjectById, resetProjectById } from "../../../reducer/Project/ProjectSlice";
import { fetchTaskData } from "../../../api/FetchApi";
import Delete from "../../DeleteProject";

const ITEM_HEIGHT = 48;
interface TabContentRef {
	submitForm: () => void;
}

export default function ActionMenu(): JSX.Element {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const handleClickOpenDelete = (): void => {
		setOpenDelete(true);
	};

	const dispatch = useDispatch<AppDispatch>();
	const { setUrlId, urlId, setArrayGet } = useContext(SaveProjectContext);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const handleCloseDialog = async (): Promise<void> => {
		setUrlId(null);
		dispatch(resetProjectById());
		setOpenDialog(false);
		await fetchTaskData(dispatch);
		setArrayGet([]);
	};

	const handleChangeOpen = async (): Promise<void> => {
		setOpenDialog(!openDialog);
		await dispatch(fetchProjectById(urlId as number));
	};
	const tabContentRef = useRef<TabContentRef | null>(null);

	const handleSubmit = (): void => {
		if (tabContentRef.current !== null) {
			tabContentRef.current.submitForm();
		}
	};

	return (
		<>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{ "aria-labelledby": "long-button" }}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } }}
			>
				<MenuList onClick={handleClose}>
					<MenuItem onClick={handleChangeOpen}>
						<FontAwesomeIcon className={styles["icon-font-awesome"]} icon={faPen} /> Edit
					</MenuItem>
					<MenuItem onClick={handleClickOpenDelete}>
						<FontAwesomeIcon className={styles["icon-font-awesome"]} icon={faTrash} /> Delete
					</MenuItem>
					<MenuItem>
						<FontAwesomeIcon className={styles["icon-font-awesome"]} icon={faX} /> Deactivate
					</MenuItem>
					<MenuItem>
						<FontAwesomeIcon className={styles["icon-font-awesome"]} icon={faEye} /> View
					</MenuItem>
				</MenuList>
			</Menu>
			{openDialog && (
				<CustomDialog open={openDialog} onClose={handleCloseDialog} onConfirm={handleSubmit}>
					<TabContent handleCloseDialog={handleCloseDialog} ref={tabContentRef} />
				</CustomDialog>
			)}

			{openDelete && <Delete openDelete={openDelete} setOpenDelete={setOpenDelete} />}
		</>
	);
}
