import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchClassData } from '../store/project-slice';
import Class from '../types/class';

import classes from './ClassDetail.module.css';
import ClassItem from './ClassItem';

const ClassDetail = () => {
	let ClassDetailContent = <p>No data to display</p>;

	const dispatch = useAppDispatch();

	const { classesToFetch, studentClasses } = useAppSelector(
		(state) => state.project
	);

	useEffect(() => {
		dispatch(fetchClassData(classesToFetch));
	}, [classesToFetch, dispatch]);

	// useEffect(() => {
	// 	dispatch(fetchClassData(classesToFetch));
	// }, [classesToFetch, dispatch]);

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
