import { useState, ReactNode, FC, createContext, useMemo, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Member, SaveProjectContextProps, Task } from "./Type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reducer/Store/Store";
import { fetchTaskData } from "../../api/FetchApi";
import { toast } from "react-toastify";
const SaveProjectContext = createContext<SaveProjectContextProps>({
	projectType: 0,
	setProjectType: () => {},
	customerId: 0,
	setCustomerId: () => {},
	users: [],
	setUsers: () => {},
	filteredTasks: [],
	setBillable: () => {},
	handleClose: () => {},
	handleOpen: () => {},
	isOpen: false,
	setUrlId: () => {},
	urlId: null,
	array: [],
	setArray: () => {},
	arrayGet: [],
	setArrayGet: () => {}
});

export const SaveProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const tasks = useSelector((state: RootState) => state.dataTask.dataTask);
	const [array, setArray] = useState<Member[]>([]);
	const [arrayGet, setArrayGet] = useState<Member[]>([]);
	const [projectType, setProjectType] = useState(0);
	const [customerId, setCustomerId] = useState(1);
	const [users, setUsers] = useState<any[]>([]);
	const dataTaskById = useSelector((state: RootState) => state.project.projectById?.tasks) ?? [];
	const [billableStatus, setBillableStatus] = useState<{
		[key: number]: boolean;
	}>({});
	const [urlId, setUrlId] = useState<number | null>();
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const handleClose = useCallback((): void => {
		setIsOpen(false);
		setArrayGet([]);
	}, []);

	const handleOpen = useCallback((): void => {
		setIsOpen(true);
	}, []);

	const billableById = useMemo(() => {
		if (dataTaskById?.length > 0) {
			const billableMap: { [key: number]: boolean } = {};
			dataTaskById.forEach((task) => {
				billableMap[task.taskId] = task.billable;
			});

			return billableMap;
		}
	}, [dataTaskById]);

	useEffect(() => {
		if (billableById != null) {
			setBillableStatus(billableById);
		}
	}, [setBillableStatus, billableById]);

	const setBillable = useCallback((taskId: number, isBillable: boolean): void => {
		setBillableStatus((prevStatus) => ({
			...prevStatus,
			[taskId]: isBillable
		}));
	}, []);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await fetchTaskData(dispatch);
			} catch (e) {
				toast.error(`${e as string}`);
			}
		};
		fetchData().catch((error) => {
			console.error("Failed to fetch project data:", error);
		});
	}, [dispatch]);

	const filteredTasks = useMemo(() => {
		const filtered = (tasks ?? [])
			.filter((task: Task) => !task.isDeleted)
			.map((task: Task) => {
				return {
					taskId: task.id,
					billable: billableStatus[task.id] ?? false,
					id: 0
				};
			});
		return filtered;
	}, [tasks, billableStatus]);

	return (
		<SaveProjectContext.Provider
			value={{
				projectType,
				setProjectType,
				customerId,
				setCustomerId,
				users,
				setUsers,
				filteredTasks,
				setBillable,
				handleClose,
				handleOpen,
				isOpen,
				setUrlId,
				urlId,
				array,
				setArray,
				arrayGet,
				setArrayGet
			}}
		>
			{children}
		</SaveProjectContext.Provider>
	);
};

export default SaveProjectContext;
