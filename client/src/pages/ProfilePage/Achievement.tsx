import { AchievementType } from '../../store/profile/types/achievementType';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const Achievement: React.FC<
  AchievementType & { completed: boolean }
> = ({ name, completed }) => {
  return (
    <Stack>
      <Box
        width="50px"
        height="50px"
        sx={{
          borderRadius: '50%',
          backgroundColor: completed ? 'green' : 'gray',
        }}
      />
      <Typography>{name}</Typography>
    </Stack>
  );
};
