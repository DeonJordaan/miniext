import { createSlice } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

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
	},
});

export const projectActions = projectSlice.actions;

export default projectSlice;
