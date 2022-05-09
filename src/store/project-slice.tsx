import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

interface ProjectState {
	loggedIn: boolean;
	currentStudent: Student | undefined;
	classes: Class[];
}

const initialProjectState: ProjectState = {
	loggedIn: false,
	currentStudent: undefined,
	classes: [],
};

const projectSlice = createSlice({
	name: 'project',
	initialState: initialProjectState,
	reducers: {
		IS_LOGGED_IN(state) {
			state.loggedIn = !state.loggedIn;
		},
	},
});

export const projectActions = projectSlice.actions;
