import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchClassData } from '../store/project-slice';
import Class from '../types/class';

import classes from './ClassDetail.module.css';
import ClassItem from './ClassItem';

const ClassDetail = () => {
	let ClassDetailContent = <p>No data to display</p>;

	const dispatch = useAppDispatch();

	const { currentStudent, studentClasses } = useAppSelector(
		(state) => state.project
	);

	console.log(currentStudent);

	useEffect(() => {
		let classesToFetch: string[] = [];
		if (currentStudent) {
			classesToFetch = currentStudent!.map((a) => a.studentClasses);
			// const { studentClasses: classesToFetch } = currentStudent[0];
		}
		dispatch(fetchClassData(classesToFetch));
		console.log(classesToFetch);
		console.log(currentStudent[0]?.studentClasses);
	}, [currentStudent, dispatch]);

	if (studentClasses.length > 0) {
		ClassDetailContent = (
			<div className={classes['class-detail']}>
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
