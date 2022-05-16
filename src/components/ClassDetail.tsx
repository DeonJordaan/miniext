import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
	fetchClassData,
	fetchAllStudentsData,
	projectActions,
} from '../store/project-slice';
import Class from '../types/class';

import classes from './ClassDetail.module.css';
import ClassItem from './ClassItem';

const ClassDetail = () => {
	let ClassDetailContent = <p>No data to display</p>;

	const dispatch = useAppDispatch();

	const { classesToFetch, studentClasses, isLoading } = useAppSelector(
		(state) => state.project
	);

	if (isLoading) {
		ClassDetailContent = <p>Loading...</p>;
	}

	useEffect(() => {
		dispatch(fetchClassData(classesToFetch));
	}, [classesToFetch, dispatch]);

	useEffect(() => {
		const allStudents: any[] = [];

		for (const i of studentClasses) {
			allStudents.push(...i.students);
		}
		const duplicatesRemovedFromAllStudents = new Set(allStudents);
		const finalStudentIdArray = Array.from(
			duplicatesRemovedFromAllStudents
		);

		dispatch(fetchAllStudentsData(finalStudentIdArray));
	}, [studentClasses, dispatch]);

	if (studentClasses.length > 0) {
		ClassDetailContent = (
			<div>
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
