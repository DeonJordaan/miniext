import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Class from '../types/class';
import Student from '../types/student';

interface ProjectState {
	isLoggedIn: boolean;
	isLoading: boolean;
	currentStudent: Student[];
	classesToFetch: string[];
	studentClasses: Class[];
	studentsData: {};
}

const initialProjectState: ProjectState = {
	isLoggedIn: false,
	isLoading: false,
	currentStudent: [],
	classesToFetch: [],
	studentClasses: [],
	studentsData: {},
};

const projectSlice = createSlice({
	name: 'project',
	initialState: initialProjectState,
	reducers: {
		IS_LOGGED_IN(state) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		SET_IS_LOADING(state) {
			state.isLoading = !state.isLoading;
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
		SET_STUDENTS_DATA(state, action) {
			state.studentsData = action.payload;
		},
		RESET_ALL() {
			return {
				...initialProjectState,
			};
		},
	},
});

export const fetchStudentData = (student: string) => {
	return async (dispatch: any) => {
		const getStudentData = async () => {
			dispatch(projectActions.SET_IS_LOADING());

			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const studentName = student;

			const studentData = await base('Students')
				.select({ filterByFormula: `FIND(Name, '${studentName}')` })
				.firstPage();
			console.log(studentData);

			const adjustString = (string: string) => {
				let newString = string.replaceAll(' ', '').toLowerCase();
				return newString;
			};

			let correctStudent: Student[];

			if (studentData.length > 1) {
				correctStudent = studentData.filter(
					adjustString(studentName) ===
						adjustString(studentData.fields.Name)
				);
				return correctStudent;
			}

			const extractedStudentData = correctStudent!.map((data: any) => {
				return {
					name: data.fields.Name,
					studentClasses: data.fields.Classes,
				};
			});

			dispatch(projectActions.SET_IS_LOADING());
			return extractedStudentData;
		};

		try {
			const fetchedStudent = await getStudentData();
			dispatch(projectSlice.actions.SET_CURRENT_STUDENT(fetchedStudent));

			if (fetchedStudent.length > 0) {
				dispatch(
					projectSlice.actions.SET_CLASSES_TO_FETCH(
						fetchedStudent[0].studentClasses
					)
				);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
				console.log(error);
			}
			// dispatch(projectActions.SET_IS_LOADING());
			dispatch(projectActions.IS_LOGGED_IN());
		}
	};
};

export const fetchClassData = (arrayOfClassIds: string[]) => {
	return async (dispatch: any) => {
		const getClassData = async () => {
			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const classIds = arrayOfClassIds;

			let arrayOfFilterFormulas: string = 'OR(';

			if (classIds) {
				classIds.forEach((id) => {
					arrayOfFilterFormulas += `RECORD_ID() = '${id}', `;
				});
				arrayOfFilterFormulas = arrayOfFilterFormulas.slice(0, -2);
				arrayOfFilterFormulas += ')';
			}

			const classData = await base('Classes')
				.select({
					filterByFormula: arrayOfFilterFormulas,
				})
				.firstPage();

			const extractClassData = classData.map((data: any) => {
				return {
					classId: data.id,
					classCode: data.fields.Name,
					students: data.fields.Students,
				};
			});

			return extractClassData;
		};

		try {
			const fetchedClasses = await getClassData();
			dispatch(projectSlice.actions.SET_STUDENT_CLASSES(fetchedClasses));
		} catch (error) {
			if (error instanceof Error) {
				alert('Unable to fetch classes data');
				console.log(error);
			}
		}
	};
};

export const fetchAllStudentsData = (arrayOfStudentIds: string[]) => {
	return async (dispatch: any) => {
		const getAllStudentsData = async () => {
			const Airtable = require('airtable');

			const base = new Airtable({
				apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
			}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

			const studentIds = arrayOfStudentIds;

			let arrayOfFilterFormulas: string = 'OR(';

			if (studentIds) {
				studentIds.forEach((id) => {
					arrayOfFilterFormulas += `RECORD_ID() = '${id}', `;
				});
				arrayOfFilterFormulas = arrayOfFilterFormulas.slice(0, -2);
				arrayOfFilterFormulas += ')';
			}

			const studentData = await base('Students')
				.select({
					filterByFormula: arrayOfFilterFormulas,
				})
				.firstPage();

			let studentDataObject: { [key: string]: string } = {};

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const extractStudentData: () => void = studentData.map(
				// eslint-disable-next-line array-callback-return
				(data: any) => {
					const studentId: string = data.id;

					studentDataObject = {
						...studentDataObject,
						[studentId]: data.fields.Name,
					};
				}
			);

			return studentDataObject;
		};

		try {
			const fetchedStudents: {} = await getAllStudentsData();
			dispatch(projectSlice.actions.SET_STUDENTS_DATA(fetchedStudents));
		} catch (error) {
			if (error instanceof Error) {
				alert('Unable to fetch student data for this class');
				console.log(error);
			}
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
