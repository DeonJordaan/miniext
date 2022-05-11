import { createSlice } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

// The ID of this base is app8ZbcPx7dkpOnP0

interface ProjectState {
	isLoggedIn: boolean;
	currentStudent: Student[];
	studentClasses: Class[];
}

const initialProjectState: ProjectState = {
	isLoggedIn: false,
	currentStudent: [],
	studentClasses: [],
};

const projectSlice = createSlice({
	name: 'project',
	initialState: initialProjectState,
	reducers: {
		IS_LOGGED_IN(state) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		SET_CURRENT_STUDENT(state, action) {
			state.currentStudent = [...action.payload];
		},
		SET_STUDENT_CLASSES(state, action) {},
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

			const studentData = await base('Students')
				.select({ filterByFormula: `FIND(Name, '${studentName}')` })
				.firstPage();

			const extractStudentData = studentData.map((data: any) => {
				return {
					name: data.fields.Name,
					studentClasses: data.fields.Classes,
				};
			});

			return extractStudentData;
		};

		try {
			const student = await getStudentData();
			dispatch(projectSlice.actions.SET_CURRENT_STUDENT(student));
			console.log(student);
			// fetchClassData();
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchClassData = (arrayOfClassIds: string[]) => {
	return async (dispatch: any) => {
		const getClassData = async () => {
			console.log(arrayOfClassIds);
			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const classIds = arrayOfClassIds;

			let arrayOfFilterFormulas: string[] = [];

			if (classIds) {
				classIds.forEach((id) => {
					arrayOfFilterFormulas.push(`Name = ${id}`);
				});
			}

			const classData = await base('Classes')
				.select({
					filterByFormula: `OR(Name = '${arrayOfFilterFormulas}')`,
				})
				.firstPage();

			console.log(classData);
			console.log(arrayOfFilterFormulas);

			const extractClassData = classData.map((data: any) => {
				return {
					classId: data.id,
					classCode: data.fields.Name,
					classes: data.fields.Students,
				};
			});

			return extractClassData;
		};

		try {
			const fetchedClasses = await getClassData();
			dispatch(projectSlice.actions.SET_STUDENT_CLASSES(fetchedClasses));
			console.log(fetchedClasses);
		} catch (error) {
			console.log(error);
		}
	};
};

export const projectActions = projectSlice.actions;

export default projectSlice;

// ATTEMPTING CUSTOM USEAIRTABLE HOOK
// export const fetchStudentData = (student: string) => {
// 	return async (dispatch: any) => {
// 		const { sendRequest: fetchStudent } = FetchAirtable();
// 		// const { isLoading, error, sendRequest: fetchStudent } = useAirtable();

// 		const getStudentData = (studentData: any[]) => {
// 			const extractedStudentData = studentData.map((data) => {
// 				return {
// 					name: data.fields.Name,
// 					classes: data.fields.Classes,
// 				};
// 			});

// 			// return extractStudentData;
// 			dispatch(
// 				projectSlice.actions.SET_CURRENT_STUDENT(extractedStudentData)
// 			);
// 		};

// 		// const currentStudent = await getStudentData();

// 		fetchStudent(
// 			{
// 				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
// 				baseId: process.env.REACT_APP_AIRTABLE_BASE_ID,
// 				queryData: student,
// 				queryField: 'Name',
// 				baseName: 'Students',
// 			},
// 			getStudentData
// 		);
// 	};
// };
