import styles from './sytles.module.css';
import { Backdrop } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Spacer } from '../../components/common/Spacer';

export const LandingPage = () => {
  return (
    <>
      <div className={styles.screen + ' ' + styles.image}>
        <Typography>ВТБ</Typography>
        <Spacer height="70px" />
        <Typography fontSize="4rem" sx={{ fontWeight: 'bolder' }}>
          featureD
        </Typography>
        <Spacer height="50px" />
        <Typography
          sx={{
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          веб-сервис для вовлечения сотрудников во внутрикорпоративную
          активность
        </Typography>
      </div>
    </>
  );
};
