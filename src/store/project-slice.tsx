import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

interface ProjectState {
	isLoggedIn: boolean;
	currentStudent: Student[];
	classesToFetch: string[];
	studentClasses: Class[];
	studentsToFetch: string[];
	//TODO Class & its students names
}

const initialProjectState: ProjectState = {
	isLoggedIn: false,
	currentStudent: [],
	classesToFetch: [],
	studentClasses: [],
	studentsToFetch: [],
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
		SET_CLASSES_TO_FETCH(state, action) {
			state.classesToFetch = action.payload;
		},
		SET_STUDENT_CLASSES(state, action) {
			state.studentClasses = action.payload;
		},
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
			const fetchedStudent = await getStudentData();
			dispatch(projectSlice.actions.SET_CURRENT_STUDENT(fetchedStudent));
			dispatch(
				projectSlice.actions.SET_CLASSES_TO_FETCH(
					fetchedStudent[0].studentClasses
				)
			);
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
					filterByFormula: `OR('${arrayOfFilterFormulas}')`,
				})
				.firstPage();

			console.log(classData);
			console.log(arrayOfFilterFormulas);

			const extractClassData = classData.map((data: any) => {
				return {
					classId: data.id,
					classCode: data.fields.Name,
					students: data.fields.Students,
				};
			});

			const allStudents: string[] = []

			for(const i )

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

//FIXME This approach would fetch the student data for EACH class
// Meaning an API call for ecery class we want to display.
// That means we will exceed the 3 API call limit per login
export const fetchStudentsPerClassData = (arrayOfStudentIds: string[]) => {
	return async (dispatch: any) => {
		const getStudentsPerClassData = async () => {
			console.log(arrayOfStudentIds);
			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const studentIds = arrayOfStudentIds;

			let arrayOfFilterFormulas: string[] = [];

			if (studentIds) {
				studentIds.forEach((id) => {
					arrayOfFilterFormulas.push(`Name = ${id}`);
				});
			}

			const studentData = await base('Classes')
				.select({
					filterByFormula: `OR('${arrayOfFilterFormulas}')`,
				})
				.firstPage();

			console.log(studentData);
			console.log(arrayOfFilterFormulas);

			const extractStudentData = studentData.map((data: any) => {
				return {
					classId: data.id,
					classCode: data.fields.Name,
					students: data.fields.Students,
				};
			});

			return extractStudentData;
		};

		try {
			const fetchedClasses = await getStudentsPerClassData();
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
