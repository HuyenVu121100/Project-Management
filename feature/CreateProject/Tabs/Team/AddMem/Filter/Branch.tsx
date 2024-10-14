import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useEffect } from "react";
import SaveProjectContext from "../../../../../../context/SaveProjectProvider/ProjectContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../reducer/Store/Store";
import { fetchBranches } from "../../../../../../reducer/Branch/Branch";
import styles from "../../AddMem/ChoiceMem/AddMem.module.css";

const Branch: React.FC = (): JSX.Element => {
	const [branchChoice, setBranchChoice] = React.useState("");
	const dispatch = useDispatch<AppDispatch>();

	const { setArray } = useContext(SaveProjectContext);
	const branch = useSelector((state: RootState) => state.branch.entities);
	const loading = useSelector((state: RootState) => state.branch.loading);
	const member = useSelector((state: RootState) => state.member.entities);

	const handleChange = (event: SelectChangeEvent): void => {
		const selectedBranch = event.target.value;
		setBranchChoice(selectedBranch);
		if (selectedBranch === "all") {
			setArray(member);
		} else {
			setArray(member.filter((item) => item.branchDisplayName === selectedBranch));
		}
	};

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await dispatch(fetchBranches());
			} catch (error) {
				console.error("Failed to fetch branches:", error);
			}
		};

		void fetchData();
	}, [dispatch]);

	if (loading === "failed") {
		return <p>Error fetching data.</p>;
	}

	return (
		<div className={styles["search-branch-wrap"]} style={{ paddingLeft: 7 }}>
			<FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="demo-simple-select-outlined-label">Branch</InputLabel>
				<Select
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					value={branchChoice}
					onChange={handleChange}
					label="Branch"
				>
					<MenuItem value="all">All</MenuItem>

					{branch?.map((item: any) => (
						<MenuItem key={item.id} value={item.name}>
							{item.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
export default Branch;
