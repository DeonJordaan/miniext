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
		const getData = async () => {
			const Airtable = require('airtable');
			const base = new Airtable({ apiKey: 'key77sp9vu5c2gXDc' }).base(
				'app8ZbcPx7dkpOnP0'
			);

			const studentName = student;
			console.log(typeof studentName);
			const studentData = await base('Students')
				.select({ filterByFormula: `FIND(Name, '${studentName}')` })
				.firstPage();

			console.log(studentData);
		};
		getData();
	};
};

export const projectActions = projectSlice.actions;

export default projectSlice;
