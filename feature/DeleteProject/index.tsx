import * as React from "react";
import ReusableDialog from "../../components/Modal/ArlertDialog";
import { useContext, useCallback } from "react";
import SaveProjectContext from "../../context/SaveProjectProvider/ProjectContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducer/Store/Store";
import { fetchProject } from "../../reducer/Project/ProjectSlice";
import { DeleteProjectDataById } from "../../api/FetchApi";
import { toast } from "react-toastify";

interface DeleteComponetProps {
	openDelete: boolean;
	setOpenDelete: (value: boolean) => void;
}

const Delete: React.FC<DeleteComponetProps> = ({ openDelete, setOpenDelete }) => {
	const { urlId } = useContext(SaveProjectContext);
	const dispatch = useDispatch<AppDispatch>();

	const handleClose = (): void => {
		setOpenDelete(false);
	};

	const handleAgree = useCallback(async () => {
		if (urlId !== undefined && urlId !== null) {
			try {
				await DeleteProjectDataById(urlId);
				void dispatch(fetchProject());
			} catch (error) {
				console.error("Error deleting project:", error);
				const message = typeof error === "string" ? error : "Something wrong";
				toast.error(`${message}`);
			}
		}
		handleClose();
	}, [urlId, dispatch]);

	return (
		<ReusableDialog
			open={openDelete}
			onClose={handleClose}
			title="Alert Dialog"
			description="Are you sure to delete the project?"
			onAgree={handleAgree}
			agreeText="Agree"
			disagreeText="Disagree"
			sx={{}}
		/>
	);
};

export default Delete;
