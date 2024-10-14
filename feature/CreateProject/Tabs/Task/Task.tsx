import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../reducer/Store/Store";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Tabs.module.css";
import { TaskType, toggleTaskStatus } from "../../../../reducer/Task/TaskReducer";
import SaveProjectContext from "../../../../context/SaveProjectProvider/ProjectContext";

const Task = (): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { setBillable, filteredTasks } = useContext(SaveProjectContext);
	const dataTask = useSelector((state: RootState) => state.dataTask.dataTask);
	const [isAllChecked, setIsAllChecked] = useState(false);

	const handleToggle = (taskId: number): void => {
		dispatch(toggleTaskStatus(taskId));
	};


	const handleCheckboxChange = (taskId: number, isBillable: boolean): void => {
		setBillable(taskId, isBillable);
	};

	const handleClickAll = (isChecked: boolean): void => {
		dataTask
			?.filter((task: TaskType) => !task.isDeleted)
			.forEach((task: TaskType) => {
				setBillable(task.id, isChecked);
			});

		setIsAllChecked(!isAllChecked);
	};

	const sortedTasks = dataTask?.slice().sort((a: TaskType, b: TaskType) => {
		return a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1;
	});

	const billableTasks = sortedTasks?.filter((task: TaskType) => !task.isDeleted);

	const nonBillableTasks = sortedTasks?.filter((task: TaskType) => task.isDeleted);

	const isTaskBillable = (taskId: number): boolean => {
		return filteredTasks.some((task) => task.taskId === taskId && task.billable);
	};

	return (
		<>
			<div className={styles.task}>
				<div className={styles["task-column-wrap"]}>
					<div className={styles["task-column"]}>
						<div style={{ display: "flex" }}>
							<h2>Billable Tasks</h2>
							<input
								style={{ marginLeft: "auto", marginRight: "4px" }}
								type="checkbox"
								onChange={(e) => handleClickAll(e.target.checked)}
							/>
						</div>
						{billableTasks?.map((task: TaskType, index: number) => (
							<div key={task.id} className={styles["task-item"]}>
								<FontAwesomeIcon
									icon={faCircleMinus}
									style={{ marginRight: "8px", cursor: "pointer" }}
									onClick={() => handleToggle(task.id)}
								/>
								<p className={styles["task-name"]}>{task.name}</p>
								<input
									style={{ marginLeft: "auto" }}
									type="checkbox"
									checked={isTaskBillable(task.id)}
									onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
								/>
							</div>
						))}
					</div>
					<div className={styles["task-column"]}>
						<h2>Non-Billable Tasks</h2>
						{nonBillableTasks?.map((task: TaskType, index: number) => (
							<div key={task.id} className={styles["task-item"]}>
								<FontAwesomeIcon
									icon={faCirclePlus}
									style={{ marginRight: "8px", cursor: "pointer" }}
									onClick={() => handleToggle(task.id)}
								/>
								<p>{task.name}</p>
								<p className={styles["other-tasks"]}>Other</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Task;
