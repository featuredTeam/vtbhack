import { AchievementType } from '../../store/profile/types/achievementType';
import { Badge, CardMedia, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Image } from 'mui-image';


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
    <Stack marginTop={5} sx={{ maxWidth: '150px' }} display='flex' flexDirection='column' alignItems='center'>
        <Badge invisible={!completed} badgeContent="Получено" color="primary"><Image duration={0} src={image} width="70px" height="70px" wrapperStyle={{padding: '5px' }} style={completed ? {} : {filter: "grayscale(100%)"}}/></Badge>
      <Typography align='center'>{name}</Typography>
      <Typography  align='center' color="#777" fontSize="0.8em">
        {description}
      </Typography>
    </Stack>
  );
};
