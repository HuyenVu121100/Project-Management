import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function Position() {
	const [positionId, setPositionId] = useState<number>(1);
	const [isTemp, setIsTemp] = useState<boolean>(false);

	const positionObject = [
		{ id: 1, name: "PM" },
		{ id: 2, name: "Member" },
		{ id: 3, name: "Shadow" },
		{ id: 4, name: "Deactive" }
	];

	const handleChange = (event: SelectChangeEvent<number>) => {
		setPositionId(Number(event.target.value));
	};

	const handleTempChange = (event: SelectChangeEvent) => {
		setIsTemp(event.target.value === "temp");
	};

	return (
		<div>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<Select labelId="position-label" id="position-select" value={positionId} onChange={handleChange}>
					{positionObject.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{item.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
				<Select labelId="temp-label" id="temp-select" value={isTemp ? "temp" : "official"} onChange={handleTempChange}>
					<MenuItem value="temp">Temporary</MenuItem>
					<MenuItem value="official">Official</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
