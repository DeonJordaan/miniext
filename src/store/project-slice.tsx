import { createSlice } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

// The ID of this base is app8ZbcPx7dkpOnP0

interface ProjectState {
	isLoggedIn: boolean;
	currentStudent: Student | undefined;
	classes: Class[];
}

const initialProjectState: ProjectState = {
	isLoggedIn: false,
	currentStudent: undefined,
	classes: [],
};

const projectSlice = createSlice({
	name: 'project',
	initialState: initialProjectState,
	reducers: {
		IS_LOGGED_IN(state) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		SET_CURRENT_STUDENT(state, action) {},
	},
});

export const fetchStudentData = (student: string) => {
	return async (dispatch: any) => {
		const getStudentData = async () => {
			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const studentName = student;

			console.log(typeof studentName);

			const studentData = await base('Students')
				.select({ filterByFormula: `FIND(Name, '${studentName}')` })
				.firstPage();

			console.log(studentData);

			const extractStudentData = studentData.map((data: any) => {
				return {
					name: data.fields.Name,
					classes: data.fields.Classes,
				};
			});

			return extractStudentData;
		};

		try {
			const student = await getStudentData();
			dispatch(projectSlice.actions.SET_CURRENT_STUDENT(student));
			console.log(student);
		} catch (error) {
			console.log(error);
		}
	};
};

export const projectActions = projectSlice.actions;

export default projectSlice;
