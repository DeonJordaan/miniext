import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';
import FetchAirtable from './FetchAirtable';

// The ID of this base is app8ZbcPx7dkpOnP0

interface ProjectState {
	isLoggedIn: boolean;
	currentStudent: Student[];
	classes: Class[];
}

const initialProjectState: ProjectState = {
	isLoggedIn: false,
	currentStudent: [],
	classes: [],
};

const projectSlice = createSlice({
	name: 'project',
	initialState: initialProjectState,
	reducers: {
		IS_LOGGED_IN(state) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		SET_CURRENT_STUDENT(state, action: PayloadAction<Student[]>) {
			state.currentStudent = action.payload;
		},
	},
});

export const fetchStudentData = (student: string) => {
	return async (dispatch: any) => {
		const { sendRequest: fetchStudent } = FetchAirtable();
		// const { isLoading, error, sendRequest: fetchStudent } = useAirtable();

		const getStudentData = (studentData: any[]) => {
			const extractedStudentData = studentData.map((data) => {
				return {
					name: data.fields.Name,
					classes: data.fields.Classes,
				};
			});

			// return extractStudentData;
			dispatch(
				projectSlice.actions.SET_CURRENT_STUDENT(extractedStudentData)
			);
		};

		// const currentStudent = await getStudentData();

		fetchStudent(
			{
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
				baseId: process.env.REACT_APP_AIRTABLE_BASE_ID,
				queryData: student,
				queryField: 'Name',
				baseName: 'Students',
			},
			getStudentData
		);
	};
};

export const projectActions = projectSlice.actions;

export default projectSlice;
