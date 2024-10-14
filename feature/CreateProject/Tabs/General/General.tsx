import { Controller, useFormContext } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import styles from "../../Tabs.module.css";
import ChoiceProjectType from "./ProjectType/ProjectType";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SelectClient from "./ClientChoice/InputClientChoice";

const General: React.FC = (): JSX.Element => {
	const {
		control,
		formState: { errors }
	} = useFormContext();

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className={styles["general-main"]}>
					<div className={styles["input-wrap"]}>
						<div className={styles["label-wrap"]}>
							<label htmlFor="">Client</label>
						</div>
						<div className={styles["client-wrap"]}>
							<div className={styles["input-element-select"]}>
								<SelectClient />
							</div>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Button className={styles["button-add-client"]} variant="outlined">
									ADD CLIENT
								</Button>
							</div>
						</div>
					</div>

					<div>
						<div className={styles["input-wrap"]}>
							<div className={styles["label-wrap"]}>
								<label>Project name</label>
							</div>
							<div className={styles["input-element"]}>
								<Controller
									control={control}
									name="name"
									rules={{ required: "Project name is required" }}
									render={({ field }) => (
										<TextField
											{...field}
											className={styles["text-field"]}
											error={errors.name !== null && errors.name !== undefined}
											helperText={(errors.name?.message as string) ?? ""}
											placeholder="Please enter name"
										/>
									)}
								/>
							</div>
						</div>

						<div className={styles["input-wrap"]}>
							<div className={styles["label-wrap"]}>
								<label htmlFor="code">Project Code</label>
							</div>
							<div className={styles["input-element"]}>
								<Controller
									control={control}
									name="code"
									rules={{ required: "Code is required" }}
									render={({ field }) => (
										<TextField
											{...field}
											className={styles["text-field"]}
											error={errors.code !== null && errors.code !== undefined}
											helperText={(errors.code?.message as string) ?? ""}
											placeholder="Please enter code"
										/>
									)}
								/>
							</div>
						</div>

						<div className={styles["input-wrap"]}>
							<div className={styles["label-wrap"]}>
								<label>Note</label>
							</div>
							<div className={styles["input-element"]}>
								<Controller
									control={control}
									name="note"
									rules={{ required: "Note is required" }}
									render={({ field }) => (
										<TextField
											{...field}
											className={styles["text-field"]}
											error={errors.note !== null && errors.note !== undefined}
											helperText={(errors.note?.message as string) ?? ""}
											placeholder="Please enter note"
										/>
									)}
								/>
							</div>
						</div>

						<div className={styles["date-wrap"]}>
							<div className={styles["input-wrap"]}>
								<div className={styles["label-wrap"]}>
									<label htmlFor="timeStart">Start Time</label>
								</div>
								<div className={styles["input-element"]}>
									<Controller
										name="timeStart"
										control={control}
										render={({ field: { onChange, value } }) => (
											<DatePicker
												className={styles["date-picker"]}
												format="DD/MM/YYYY"
												value={value !== undefined ? dayjs(value) : dayjs(new Date())}
												onChange={(date) => onChange(dayjs(date).format("YYYY-MM-DD"))}
											/>
										)}
									/>
								</div>
							</div>

							<div className={styles["input-wrap"]}>
								<div className={styles["label-wrap-date"]}>
									<label>to</label>
								</div>
								<div className={styles["input-element"]}>
									<Controller
										name="timeEnd"
										control={control}
										render={({ field: { onChange, value } }) => (
											<DatePicker
												format="DD/MM/YYYY"
												className={styles["date-picker"]}
												value={value !== undefined ? dayjs(value) : dayjs(new Date())}
												onChange={(date) => onChange(dayjs(date).format("YYYY-MM-DD"))}
											/>
										)}
									/>
								</div>
							</div>
						</div>

						<div className={styles["input-wrap"]}>
							<div className={styles["label-wrap"]}>
								<label>All User</label>
							</div>
							<div className={styles["input-element-checkbox"]}>
								<input type="checkbox" />
								<p>Auto add user as a member of this project when creating new user</p>
							</div>
						</div>

						<div className={styles["input-wrap"]}>
							<div className={styles["label-wrap"]}>
								<label>Project Type</label>
							</div>
							<div className={styles["input-element"]}>
								<ChoiceProjectType />
							</div>
						</div>
					</div>
				</div>
			</LocalizationProvider>
		</>
	);
};

export default General;
