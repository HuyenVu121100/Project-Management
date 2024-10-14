import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

interface CustomDialogProps {
	open: boolean;
	onClose?: () => void;
	title?: string;
	children: React.ReactNode;
	onConfirm?: () => void;
	confirmDisabled?: boolean;
	contentHeight?: number | string;
	contentWidth?: number | string;
	isEditProject?: boolean;
	maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
	open,
	onClose,
	children,
	onConfirm,
	confirmDisabled,
	contentHeight = "90vh",
	maxWidth = "lg",

}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={true} aria-labelledby="dialog-title" aria-describedby="dialog-description">
			<DialogContent style={{ height: contentHeight }}>{children}</DialogContent>
			<DialogActions  sx={{ paddingRight: "48px", zIndex: "10000", backgroundColor: "white" }}>
				<Button onClick={onClose} variant="outlined" color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} type="submit" variant="contained" disabled={confirmDisabled} >
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
