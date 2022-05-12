import { useAppSelector } from '../store/hooks';
import classes from './ClassItem.module.css';

const ClassItem: React.FC<{
	key: string;
	classCode: string;
	students: string[];
}> = (props) => {
	const { studentsData } = useAppSelector((state) => state.project);

	return (
		<div className="something">
			<span className={classes['class-detail__heading']}>Name</span>
			<span className={classes['class-detail__item']}>
				{props.classCode}
			</span>
			<span className={classes['class-detail__heading']}>Students</span>
			<span className={classes['class-detail__item']}>
				Jenny, Mike, Sid
			</span>
		</div>
	);
};

export default ClassItem;
