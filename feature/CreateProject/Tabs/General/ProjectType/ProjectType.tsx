import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import styles from "../../../Tabs.module.css";
import SaveProjectContext from "../../../../../context/SaveProjectProvider/ProjectContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reducer/Store/Store";

const data = [
	{ id: 1, name: "T&M" },
	{ id: 2, name: "Fixed Price" },
	{ id: 3, name: "Non-Bill" },
	{ id: 4, name: "ODC" },
	{ id: 5, name: "Product" },
	{ id: 6, name: "Training" },
	{ id: 7, name: "NoSalary" }
];

export const ProjectWrap = styled("div")`
	display: flex;
	gap: 18px;
	flex-wrap: wrap;
`;

const ChoiceProjectType = () => {
	const dataProjectById = useSelector((state: RootState) => state.project.projectById?.projectType);
	const { projectType, setProjectType } = useContext(SaveProjectContext);

	useEffect(() => {
		if (dataProjectById) {
			setProjectType(dataProjectById);
		}
	}, [dataProjectById]);

	return (
		<ProjectWrap>
			{data.map((item) => (
				<div className={styles["button-project-choice"]}>
					<Button
						sx={{ border: "1px solid blue", width: "100%" }}
						key={item.id}
						onClick={() => setProjectType(item.id)}
						className={projectType === item.id ? styles["after-click"] : ""}
					>
						{item.name}
					</Button>
				</div>
			))}
		</ProjectWrap>
	);
};

export default ChoiceProjectType;
