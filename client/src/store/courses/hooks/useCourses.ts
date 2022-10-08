import { useAppSelector } from '../../store';

export const useCourses = () => {
  const { loading, courses } = useAppSelector((store) => store.courses);

  return { loading, courses };
};
