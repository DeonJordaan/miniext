import classes from './ClassDetail.module.css';

const ClassDetail = () => {
	return (
		<div className={classes['class-detail']}>
			<span className={classes['class-detail__heading']}>Name</span>
			<span className={classes['class-detail__item']}>CS103</span>
			<span className={classes['class-detail__heading']}>Students</span>
			<span className={classes['class-detail__item']}>
				Jenny, Mike, Sid
			</span>
		</div>
	);
};

export default ClassDetail;
