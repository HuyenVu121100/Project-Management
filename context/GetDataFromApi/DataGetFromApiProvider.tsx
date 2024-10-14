import React, { createContext, useState, ReactNode } from "react";
import { Branch } from "./DataType";

interface DataFromApiContextType {
	branch: Branch[];
	setBranch: React.Dispatch<React.SetStateAction<Branch[]>>;
}

const DataFromApiContext = createContext<DataFromApiContextType | undefined>(undefined);

interface DataGetFromApiProps {
	children: ReactNode;
}

const DataGetFromApi: React.FC<DataGetFromApiProps> = ({ children }) => {
	const [branch, setBranch] = useState<Branch[]>([]);

	return <DataFromApiContext.Provider value={{ branch, setBranch }}>{children}</DataFromApiContext.Provider>;
};

export default DataGetFromApi;
export { DataFromApiContext };
