import { useContext, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Task from "./Task/Task";
import CheckboxList from "./Notification/Notification";
import AddMember from "./Team/AddMem/ChoiceMem/AddMember";
import { FormProvider, useForm } from "react-hook-form";
import General from "./General/General";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reducer/Store/Store";
import SaveProjectContext from "../../../context/SaveProjectProvider/ProjectContext";
import SaveProject from "../../../context/SaveProjectProvider/DataSaveProject";
import { setDataTask, TaskType } from "../../../reducer/Task/TaskReducer";
import { User } from "../../../context/SaveProjectProvider/Type";
import { toast } from "react-toastify";
import styles from "../Tabs.module.css";
import { fetchProject } from "../../../reducer/Project/ProjectSlice";
import { AxiosError } from "axios";

interface TabContentProps {
	handleCloseDialog: () => void;
}

const TabContent = forwardRef(({ handleCloseDialog }: TabContentProps, ref) => {
	const dispatch = useDispatch<AppDispatch>();
	const [value, setValue] = useState("1");
	const { setArrayGet, arrayGet, setUsers, users, filteredTasks, customerId, projectType, urlId, handleClose } = useContext(SaveProjectContext);
	const dataTask = useSelector((state: RootState) => state.dataTask.dataTask);
	const dataUserById = useSelector((state: RootState) => state.project.projectById?.users) ?? [];
	const dataTaskById = useSelector((state: RootState) => state.project.projectById?.tasks) ?? [];
	const member = useSelector((state: RootState) => state.member.entities);
	const dataProjectById = useSelector((state: RootState) => state.project.projectById);

	const handleChange = (_event: React.SyntheticEvent, newValue: string): void => {
		setValue(newValue);
	};

	useEffect(() => {
		if (dataTaskById.length > 0) {
			const individualTaskIds = new Set(dataTaskById.map((task: { taskId: number }) => task.taskId));

			const updatedTasks =
				dataTask?.map((task: TaskType) => ({
					...task,
					isDeleted: !individualTaskIds.has(task.id)
				})) ?? [];

			dispatch(setDataTask(updatedTasks));
		}
	}, [dataTaskById, dispatch]);

	useEffect(() => {
		if (dataUserById.length > 0) {
			const userIds = new Set(dataUserById.map((user: { userId: number }) => user.userId));
			const filteredUsers = member?.filter((memberItem: { id: number }) => userIds.has(memberItem.id)) ?? [];

			setArrayGet(filteredUsers);
		}
	}, [member, dataUserById]);

	useEffect(() => {
		const updatedUsers = arrayGet.map((item: any) => ({
			userId: item.id,
			type: Number(item.positionId),
			isTemp: item.isTemp
		}));
		setUsers(updatedUsers);
	}, [arrayGet, setUsers]);

	const methods = useForm({
		defaultValues: {
			name: "",
			code: "",
			customerId: 1,
			timeStart: new Date().toISOString(),
			timeEnd: new Date().toISOString(),
			note: "",
			projectType: 0,
			tasks: [],
			user: []
		}
	});

	const { reset } = methods;

	useEffect(() => {
		if (dataProjectById !== null && dataProjectById !== undefined) {
			reset({
				name: dataProjectById.name ?? "",
				code: dataProjectById.code ?? "",
				timeStart: dataProjectById.timeStart !== "" ? new Date(dataProjectById.timeStart).toISOString() : new Date().toISOString(),
				timeEnd: dataProjectById.timeEnd !== "" ? new Date(dataProjectById.timeEnd).toISOString() : new Date().toISOString(),
				note: dataProjectById.note ?? "",
				projectType: dataProjectById.projectType ?? 0,
				tasks: filteredTasks ?? [],
				user: users ?? []
			});
		}
	}, [dataProjectById, reset]);
	interface ErrorType {
		response: {
			data: {
				error: {
					message: string;
				};
			};
		};
	}

	const onSubmit = async (data: any): Promise<void> => {
		try {
			await SaveProject(
				urlId as number,
				data.name,
				data.code,
				customerId,
				new Date(data.timeStart).toISOString(),
				new Date(data.timeEnd).toISOString(),
				data.note ?? "",
				projectType,
				1,
				filteredTasks,
				users as User[]
			);
			reset();
			toast.success("success");
			handleClose();
			handleCloseDialog();
			void dispatch(fetchProject());
		} catch (e) {
			const error = e as AxiosError;
			console.log(error);
			const message = (error as ErrorType)?.response?.data?.error.message;
			toast.error(`${message}`);
		}
	};

	useImperativeHandle(ref, () => ({
		submitForm: methods.handleSubmit(onSubmit)
	}));

	return (
		<FormProvider {...methods}>
			<form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
				<TabContext value={value}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							position: "absolute",
							backgroundColor: "white",
							zIndex: "1000000",
							width: "100%",
							top: 0
						}}
					>
						<TabList onChange={handleChange} aria-label="project tabs">
							<Tab label="General" value="1" />
							<Tab label="Task" value="2" />
							<Tab label="Team" value="3" />
							<Tab label="Notification" value="4" />
						</TabList>
					</Box>
					<Box className={styles["box-tab"]}>
						<TabPanel value="1">
							<General />
						</TabPanel>
						<TabPanel sx={{ width: "85%" }} value="2">
							<Task />
						</TabPanel>
						<TabPanel value="3">
							<AddMember />
						</TabPanel>
						<TabPanel value="4">
							<CheckboxList />
						</TabPanel>
					</Box>
				</TabContext>
			</form>
		</FormProvider>
	);
});
TabContent.displayName = "TabContent";

export default TabContent;
