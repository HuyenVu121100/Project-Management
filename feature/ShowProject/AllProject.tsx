import { useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reducer/Store/Store";
import styles from "./ShowProject.module.css";
import { Chip } from "@mui/material";
import Action from "../ManagerProject/Action/Action";
import FormAddProject from "../CreateProject";
import SaveProjectContext from "../../context/SaveProjectProvider/ProjectContext";
import { fetchProject, ProjectType } from "../../reducer/Project/ProjectSlice";
import { fetchMembers } from "../../reducer/Member/Member";
import CustomizedInputBase from "./Search/Search";

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${year}-${month}-${day}`;
};

export default function AllProject(): JSX.Element {
	const dispatch = useDispatch<AppDispatch>();
	const dataProject = useSelector((state: RootState) => state.project.project);

	const { setUrlId } = useContext(SaveProjectContext);

	const handleSetUrl = (id: number): void => {
		setUrlId(id);
	};

	useEffect(() => {
		void dispatch(fetchMembers());
	}, [dispatch]);

	useEffect(() => {
		void dispatch(fetchProject());
	}, [dispatch]);

	const groupedData = useMemo(() => {
		if (dataProject === null || dataProject.length === 0) {
			return {};
		}

		return dataProject.reduce((acc: { [key: string]: ProjectType[] }, project: ProjectType) => {
			const { customerName } = project;
			if (typeof acc[customerName] === "undefined") {
				acc[customerName] = [];
			}
			acc[customerName].push(project);
			return acc;
		}, {});
	}, [dataProject]);

	return (
		<>
			<div>
				<h2 className={styles["h2-manager"]}>Manager Project</h2>
				<div className={styles["form-add-project"]}>
					<FormAddProject />
					<div className={styles["search-project"]}>
						<CustomizedInputBase />
					</div>
				</div>
				<div>
					{Object.keys(groupedData).map((customerName) => (
						<div key={customerName} style={{ marginBottom: "20px" }}>
							<p className={styles["customer-name"]}>{customerName}</p>

							{groupedData[customerName].map((project: ProjectType) => (
								<div key={project.id} onClick={() => handleSetUrl(project.id)} className={styles["project-id"]}>
									<div className={styles["project-info"]}>
										<p className={styles["project-name"]}> {project.name}</p>
										<Chip label={project.pms.join(", ")} color="primary" sx={{ fontSize: "0.7em", overflowX: "hidden" }} />
										<Chip
											label={`${project.activeMember} Member`}
											color="success"
											sx={{ fontSize: "0.7em", backgroundColor: "red" }}
										/>
										<Chip label={formatDate(project.timeStart)} color="success" sx={{ fontSize: "0.7em" }} />
										<Chip label={formatDate(project.timeEnd)} color="success" sx={{ fontSize: "0.7em" }} />
									</div>
									<div className={styles["action-wrap"]}>
										<Action />
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
