import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../reducer/Store/Store";
import SaveProjectContext from "../../../../../context/SaveProjectProvider/ProjectContext";
import { CustomerType } from "../../../../../context/SaveProjectProvider/Type";
import { fetchClients } from "../../../../../reducer/Customer/Customer";

export default function SelectClient(): JSX.Element {
	const { customerId, setCustomerId } = useContext(SaveProjectContext);
	const data = useSelector((state: RootState) => state.client.entities);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await dispatch(fetchClients());
			} catch (error) {
				console.error("Error fetching clients:", error);
			}
		};

		fetchData();
	}, [dispatch]);

	const dataProjectById = useSelector((state: RootState) => state.project.projectById?.customerId);

	useEffect(() => {
		if (dataProjectById) {
			setCustomerId(dataProjectById);
		}
	}, [dataProjectById]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const selectedCustomerName = event.target.value;
		const selectedCustomer = data?.find((customer: CustomerType) => customer.name === selectedCustomerName);
		if (selectedCustomer != null) {
			setCustomerId(selectedCustomer.id);
		}
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "100%" }
			}}
			noValidate
			autoComplete="off"
		>
			<div >
				<TextField
					id="outlined-select-customer"
					select
					onChange={handleChange}
					sx={{margin:"0px !important"}}
					value={
						data != null && Array.isArray(data) && customerId != null && !isNaN(customerId)
							? (data.find((customer: CustomerType) => customer.id === customerId)?.name ?? "")
							: ""
					}
				>
					{data != null && data.length > 0 ? (
						data.map((option: CustomerType) => (
							<MenuItem key={option.id} value={option.name}>
								{option.name}
							</MenuItem>
						))
					) : (
						<MenuItem disabled>Have no data</MenuItem>
					)}
				</TextField>
			</div>
		</Box>
	);
}
