import { useAppSelector } from '../../store';

export const useProfile = () => {
  const { achievements, completedAchievements, profile, balance, loading } =
    useAppSelector((store) => store.profile);

  return { achievements, completedAchievements, profile, balance, loading };
};
