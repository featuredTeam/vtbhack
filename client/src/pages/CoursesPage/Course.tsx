import {
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from '@mui/material';
import { CourseStatus, CourseType } from '../../store/courses/types/courseType';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { startCourseAction } from '../../store/courses/actions/startCourse';
import { finishCourseAction } from '../../store/courses/actions/finishCourse';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const StatusLabels = {
  [CourseStatus.NotStarted]: 'Не начат',
  [CourseStatus.InProgress]: 'В процессе',
  [CourseStatus.Completed]: 'Пройден',
};

const StatusColors = {
  [CourseStatus.NotStarted]: 'default',
  [CourseStatus.InProgress]: 'warning',
  [CourseStatus.Completed]: 'success',
};

export const Course: React.FC<CourseType> = ({
  id,
  name,
  status,
  link,
  required,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAction = () => {
    if (status === CourseStatus.NotStarted) {
      dispatch(startCourseAction(id));
    } else {
      dispatch(finishCourseAction(id));
    }
  };

  return (
    <Card sx={{ width: 345, display: 'inline-block', marginRight: '20px' }}>
      <CardActionArea onClick={() => (document.location = link)}>
        <CardMedia
          component="img"
          height="140"
          sx={{ backgroundColor: 'blue' }}
        />
        <CardContent>
          <Badge invisible={!required} badgeContent="Обяз." color="error">
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </Badge>
        </CardContent>
      </CardActionArea>
      {status && (
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
              {status !== CourseStatus.Completed && (
                <Button onClick={onAction} size="small" color="primary">
                  {status === CourseStatus.NotStarted ? 'Начать' : 'Закончить'}
                </Button>
              )}
            </div>
            <Chip
              color={StatusColors[status] as any}
              label={StatusLabels[status]}
            />
          </Stack>
        </CardActions>
      )}
    </Card>
  );
};
