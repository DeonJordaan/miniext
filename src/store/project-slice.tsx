import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import dBase from './airtable';

import Class from '../types/class';
import Student from '../types/student';

interface ProjectState {
	isLoggedIn: boolean;
	isLoading: boolean;
	currentStudent: Student[] | undefined;
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

// Fetch the login student's data.
export const fetchStudentData = (student: string) => {
	return async (dispatch: any) => {
		const getStudentData = async () => {
			dispatch(projectActions.SET_IS_LOADING());

			const studentName = student;

			const studentData = await dBase('Students')
				.select({ filterByFormula: `FIND(Name, '${studentName}')` })
				.firstPage();

			// Extract student data from data retrieved.
			const extractStudentData = studentData.map((data: any) => {
				return {
					name: data.fields.Name,
					studentClasses: data.fields.Classes,
				};
			});

			// Account for overlapping results, as in this case fetching Joe James' data returns both his and Joe's.
			// Filter out the results that don't match the user entered data exactly.
			let filteredStudent: Student[] | undefined;

			if (extractStudentData.length > 1) {
				filteredStudent = extractStudentData.filter(function (
					el: Student
				) {
					return el.name === studentName;
				});
			} else if (extractStudentData.length <= 0) {
				throw new Error('No student data received');
			} else {
				filteredStudent = extractStudentData;
			}

			dispatch(projectActions.SET_IS_LOADING());
			return filteredStudent;
		};

		try {
			const fetchedStudent = await getStudentData();

			if (fetchedStudent && fetchedStudent.length > 0) {
				dispatch(
					projectSlice.actions.SET_CURRENT_STUDENT(fetchedStudent)
				);
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
			dispatch(projectActions.IS_LOGGED_IN());
		}
	};
};

// Fetch all class data for the login student's classes.
export const fetchClassData = (arrayOfClassIds: string[]) => {
	return async (dispatch: any) => {
		const getClassData = async () => {
			const classIds = arrayOfClassIds;

			// Dynamically construct the filter formula, depending on the classes that need to be fetched for each login student.
			let arrayOfFilterFormulas: string = 'OR(';

			if (classIds) {
				classIds.forEach((id) => {
					arrayOfFilterFormulas += `RECORD_ID() = '${id}', `;
				});
				arrayOfFilterFormulas = arrayOfFilterFormulas.slice(0, -2);
				arrayOfFilterFormulas += ')';
			}

			const classData = await dBase('Classes')
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

// Fetch student data in order to populate all students in each displayed class.
export const fetchAllStudentsData = (arrayOfStudentIds: string[]) => {
	return async (dispatch: any) => {
		const getAllStudentsData = async () => {
			const studentIds = arrayOfStudentIds;

			let arrayOfFilterFormulas: string = 'OR(';

			if (studentIds) {
				studentIds.forEach((id) => {
					arrayOfFilterFormulas += `RECORD_ID() = '${id}', `;
				});
				arrayOfFilterFormulas = arrayOfFilterFormulas.slice(0, -2);
				arrayOfFilterFormulas += ')';
			}

			const studentData = await dBase('Students')
				.select({
					filterByFormula: arrayOfFilterFormulas,
				})
				.firstPage();

			// Create student data object to assign each student name to their Airtable ID.
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
