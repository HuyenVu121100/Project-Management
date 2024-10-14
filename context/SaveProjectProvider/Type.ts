export interface SaveProjectContextProps {
	urlId?: number | null;
	setUrlId: (urlId: number | null) => void;
	projectType: number;
	setProjectType: (projectType: number) => void;
	customerId: number;
	setCustomerId: (customerId: number) => void;
	users: UseType[];
	setUsers: (users: UseType[]) => void;
	filteredTasks: any[];
	setBillable: (taskId: number, isBillable: boolean) => void;
	handleClose: () => void;
	handleOpen: () => void;
	isOpen: boolean;
	array: Member[];
	setArray: (array: Member[]) => void;
	arrayGet: Member[];
	setArrayGet: (arrayGet: Member[]) => void;
}

export interface Task {
	id: number;
	isDeleted: boolean;
	name: string;
	type: number;
}

export interface TaskPost {
	taskId: number;
	billable: boolean;
	id: number;
}

export interface User {
	userId: number;
	type: number;
	isTemp: boolean;
	id: number;
}

export interface ProjectTargetUser {
	userId: number;
	roleName: string;
	id: number;
}
export interface Customer {
	name: string;
	code: string;
	id: number;
}

export interface Member {
	[x: string]: any;
	name: string;
	emailAddress: string;
	isActive: true;
	type: number;
	jobTitle: string;
	level: number;
	userCode: string;
	avatarPath: string;
	avatarFullPath: string;
	branch: number;
	branchColor: string;
	branchDisplayName: string;
	branchId: number;
	positionId: number;
	positionName: string;
	id: number;
}

export interface ProjectType {
	customerName: string;
	name: string;
	code: string;
	status: number;
	pms: string[];
	activeMember: number;
	projectType: number;
	timeStart: string;
	timeEnd: string;
	id: number;
	note: string;
}
export interface Branch {
	name: string;
	displayName: string;
	id: number;
}
export interface CustomerType {
	name: string;
	code: string;
	id: number;
}
export interface ClientType {
	name: string;
	code: string;
	id: number;
}
export interface UsersType {
	isTemp: boolean;
	type: number;
	userId: number;
}
