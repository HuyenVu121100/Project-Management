import { useState } from "react";
import { Checkbox, FormControlLabel, List, ListItem, Divider } from "@mui/material";

const CheckboxList = (): JSX.Element => {
	const items = [
		"Submit timesheet",
		"Request Off/Remote/Onsite/Đi muộn, về sớm",
		"Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm",
		"Request Change Working Time",
		"Approve/Reject Change Working Time"
	];

	const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

	const handleCheckboxChange = (event: any, item: string): void => {
		setCheckedItems((prevState) => ({
			...prevState,
			[item]: event.target.checked
		}));
	};

	return (
		<div>
			<Divider />
			<List>
				{items.map((item) => (
					<ListItem key={item}>
						<FormControlLabel
							control={<Checkbox checked={!!checkedItems[item]} onChange={(event) => handleCheckboxChange(event, item)} />}
							label={item}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default CheckboxList;
