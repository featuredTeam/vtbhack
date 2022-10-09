import Typography from '@mui/material/Typography';
import { Spacer } from '../../components/common/Spacer';
import { CircularProgress, Divider } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { useCourses } from '../../store/courses/hooks/useCourses';
import { useEffect } from 'react';
import { getCourses } from '../../store/courses/actions/getCourses';
import { Course } from './Course';

export const CoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, courses } = useCourses();

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Spacer height="20px" />
      <Typography fontSize="2em">Курсы</Typography>
      <Divider />
      <Spacer height={'20px'} />
      {courses.map((course) => (
        <Course key={course.id} {...course} />
      ))}
    </>
  );
};
