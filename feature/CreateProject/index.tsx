import React, { useContext, useRef } from "react";
import { Fab } from "@mui/material";
import CustomDialog from "../../components/Modal/TabDialog";
import SaveProjectContext from "../../context/SaveProjectProvider/ProjectContext";
import AddIcon from "@mui/icons-material/Add";
import TabContent from "./Tabs/TabContent";

interface TabContentRef {
	submitForm: () => void;
}
const FormAddProject: React.FC = () => {
	const { filteredTasks, isOpen, handleClose, handleOpen } = useContext(SaveProjectContext);
	const tabContentRef = useRef<TabContentRef | null>(null);

	const handleSubmit = (): void => {
		if (tabContentRef.current !== null) {
			tabContentRef.current.submitForm();
		}
	};

	return (
		<div>
			<Fab variant="extended" color="primary" sx={{ marginLeft: 2, borderRadius: "0%" }} onClick={handleOpen}>
				<AddIcon sx={{ mr: 1 }} />
				ADD PROJECT
			</Fab>
			<CustomDialog
				open={isOpen}
				onClose={handleClose}
				confirmDisabled={filteredTasks?.length === 0}
				isEditProject={false}
				onConfirm={handleSubmit}
			>
				<TabContent ref={tabContentRef} handleCloseDialog={handleClose} />
			</CustomDialog>
		</div>
	);
};

export default FormAddProject;
