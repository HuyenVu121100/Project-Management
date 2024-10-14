import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface ReusableDialogProps {
	open: boolean;
	onClose?: () => void;
	title?: string;
	description?: string;
	onAgree?: () => void;
	agreeText?: string;
	disagreeText?: string;
	sx?: object;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
	open,
	onClose,
	description,
	onAgree,
	agreeText = "Agree",
	disagreeText = "Disagree",
	sx = {}
}) => {
	return (
		<Dialog
			sx={{ ...sx }}
			open={open}
			maxWidth={false}
			onClose={onClose}
			aria-labelledby="reusable-dialog-title"
			aria-describedby="reusable-dialog-description"
		>
			<DialogContent>
				<DialogContentText id="reusable-dialog-description">{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>{disagreeText}</Button>
				<Button onClick={onAgree} autoFocus>
					{agreeText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReusableDialog;
