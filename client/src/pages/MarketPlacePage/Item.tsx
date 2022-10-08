import { useAuth } from '../../store/auth/hooks/useAuth';
import { useAppDispatch } from '../../store/store';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/material';
import { ItemType } from '../../store/items/types/itemType';
import { buyItem } from '../../store/items/actions/buyItem';

export const Item: React.FC<{ item: ItemType }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAuth();

  return (
    <Card sx={{ width: 345, display: 'inline-block', marginRight: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          sx={{ backgroundColor: 'blue' }}
          image={item.image ?? null}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography
            gutterBottom
            fontSize={'0.9em'}
            color={'#777'}
            component="div"
          >
            Стоимость: {item.cost} монет
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack
          direction="row"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {isAuthorized && (
              <Button
                onClick={() => {
                  dispatch(buyItem(item.id));
                }}
                sx={{ width: '100%' }}
                variant="outlined"
              >
                Купить
              </Button>
            )}
          </div>
        </Stack>
      </CardActions>
    </Card>
  );
};
