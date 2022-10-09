import { AchievementType } from '../../store/profile/types/achievementType';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AdditionalImages = [
  '/6108449_trophy-emoji-trophy-emoji-transparent-png.png',
  '/260068783012212 3.png',
  '/kisspng_clip_art_portable_network_graphics_handshake_image_skype.png',
  '/telephone-emoji-512x442-9q99uzi2 2.png',
];

export const Achievement: React.FC<
  AchievementType & { completed: boolean }
> = ({ name, completed, description, image, reward, id }) => {
  return (
    <Stack sx={{ maxWidth: '100px' }}>
      <img
        width="80px"
        height="80px"
        src={image}
        style={{
          backgroundColor: completed ? 'green' : 'gray',
          borderRadius: '15px',
        }}
      />
      <Typography>{name}</Typography>
      <Typography color="#777" fontSize="0.8em">
        {description}
      </Typography>
    </Stack>
  );
};
