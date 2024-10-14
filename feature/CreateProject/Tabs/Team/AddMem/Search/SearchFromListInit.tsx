import React, { useContext, useEffect, useState } from "react";
import { Member } from "../../../../../../context/SaveProjectProvider/Type";
import SaveProjectContext from "../../../../../../context/SaveProjectProvider/ProjectContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../reducer/Store/Store";
import styles from "../../AddMem/ChoiceMem/AddMem.module.css";

const SearchFromListInit = (): JSX.Element => {
	const member = useSelector((state: RootState) => state.member.entities);
	const [searchTerm, setSearchTerm] = useState("");
	const { setArray } = useContext(SaveProjectContext);

	useEffect(() => {
		const removeAccents = (str: string): string => {
			return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		};

		const filterName = member?.filter((user) => removeAccents(user.name).toLowerCase().includes(removeAccents(searchTerm).toLowerCase()));
		setArray(filterName as Member[]);
	}, [searchTerm, member]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className={styles["search-init-box"]}>
			<input
				type="text"
				placeholder="Search Name"
				value={searchTerm}
				onChange={handleSearchChange}
				autoFocus
				style={{ height: "2.5em", width: "100%" }}
			/>
		</div>
	);
};

export default SearchFromListInit;
