import { useAppSelector } from '../store/hooks';
import classes from './ClassItem.module.css';

const ClassItem: React.FC<{
	key: string;
	classCode: string;
	studentIds: string[];
}> = (props) => {
	const { studentsData } = useAppSelector((state) => state.project);

	const studentData = studentsData;

	const receivedIds = props.studentIds;

	// console.log(receivedIds);

	const getStudentName = (
		studentId: string,
		studentObject: { [x: string]: string }
	) => {
		return studentObject[studentId];
	};

	const studentNames = receivedIds.map((id) => {
		return getStudentName(id, studentData);
	});

	console.log(studentNames);

	const stringifiedStudentNames = studentNames.toString();
	// receivedIds.map((id) => {
	// for (const i in studentsData) {
	// return studentData[id];
	// return studentData.{id};
	// }
	// });

	// const studentsInEachClass = (studentIds: string{[]) => {
	// 	for (const i of studentsData) {
	// 		if (i.studentId === studentIds) {
	// 			return i.name;
	// 		}
	// 	}
	// };

	return (
		<div className="something">
			<span className={classes['class-detail__heading']}>Name</span>
			<span className={classes['class-detail__item']}>
				{props.classCode}
			</span>
			<span className={classes['class-detail__heading']}>Students</span>
			<span className={classes['class-detail__item']}>
				{/* Jenny, Mike, Sid */}
				{stringifiedStudentNames}
			</span>
		</div>
	);
};

export default ClassItem;
