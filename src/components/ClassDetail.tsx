import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import {
	fetchClassData,
	fetchAllStudentsData,
	projectActions,
} from '../store/project-slice';

import Class from '../types/class';
import ClassItem from './ClassItem';

import classes from './ClassDetail.module.css';

const ClassDetail = () => {
	//CMNT
	console.log('CLASSDETAIL');

	// Declare variable containing content to be displayed.
	let ClassDetailContent = <p>No data to display</p>;

	const dispatch = useAppDispatch();

	const { classesToFetch, studentClasses, isLoading } = useAppSelector(
		(state) => state.project
	);

	if (isLoading) {
		ClassDetailContent = <p>Loading...</p>;
	}

	// Initiate fetching of class data when fresh data is received after new student login
	useEffect(() => {
		dispatch(fetchClassData(classesToFetch));
	}, [classesToFetch, dispatch]);

	// When classes are updated, construct an array of all students from only the classes that need to be displayed
	// To be used to fetch only the student data needed to display required classes.
	useEffect(() => {
		const allStudents: any[] = [];

		// Loop over list of classes and extract & push student data
		for (const i of studentClasses) {
			allStudents.push(...i.students);
		}
		// Remove duplicates
		const duplicatesRemovedFromAllStudents = new Set(allStudents);
		const finalStudentIdArray = Array.from(
			duplicatesRemovedFromAllStudents
		);

		// Initiate fetching of student data
		dispatch(fetchAllStudentsData(finalStudentIdArray));
	}, [studentClasses, dispatch]);

	// If class data is available, render it to the display.
	if (studentClasses.length > 0) {
		ClassDetailContent = (
			<div data-testid="class-detail">
				{studentClasses.map((item: Class) => (
					<ClassItem
						key={item.classId}
						classCode={item.classCode}
						studentIds={item.students}
					/>
				))}
			</div>
		);
	}

	const logoutHandler = () => {
		dispatch(projectActions.IS_LOGGED_IN());
		dispatch(projectActions.RESET_ALL());
	};

	return (
		<Fragment>
			<button
				className={classes.logout}
				type="button"
				onClick={logoutHandler}
			>
				Logout
			</button>
			{ClassDetailContent}
		</Fragment>
	);
};

export default ClassDetail;
