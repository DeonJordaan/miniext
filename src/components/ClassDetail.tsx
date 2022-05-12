import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchClassData, fetchAllStudentsData } from '../store/project-slice';
import Class from '../types/class';

// import classes from './ClassDetail.module.css';
import ClassItem from './ClassItem';

const ClassDetail = () => {
	let ClassDetailContent = <p>No data to display</p>;

	const dispatch = useAppDispatch();

	const { classesToFetch, studentClasses } = useAppSelector(
		(state) => state.project
	);

	useEffect(() => {
		console.log(classesToFetch);
		dispatch(fetchClassData(classesToFetch));
	}, [classesToFetch, dispatch]);

	useEffect(() => {
		console.log(studentClasses);
		const allStudents: any[] = [];

		for (const i of studentClasses) {
			allStudents.push(...i.students);
		}
		console.log(allStudents);
		const duplicatesRemovedFromAllStudents = new Set(allStudents);
		const finalStudentIdArray = Array.from(
			duplicatesRemovedFromAllStudents
		);

		// CMNT
		// dispatch(fetchAllStudentsData(finalStudentIdArray));
	}, [studentClasses, dispatch]);

	if (studentClasses.length > 0) {
		ClassDetailContent = (
			<div>
				{studentClasses.map((item: Class) => (
					<ClassItem
						key={item.classId}
						classCode={item.classCode}
						students={item.students}
					/>
				))}
			</div>
		);
	}

	return <>{ClassDetailContent}</>;
};

export default ClassDetail;
