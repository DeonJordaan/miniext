import classes from './ClassDetail.module.css';

const ClassItem: React.FC<{
	key: string;
	classCode: string;
	students: string[];
}> = (props) => {
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
