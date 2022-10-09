import styles from './sytles.module.css';
import Typography from '@mui/material/Typography';
import { Spacer } from '../../components/common/Spacer';
import { ArrowDownward } from '@mui/icons-material';
import { Idea } from '../Ideas/Idea';
import { IdeaStatus } from '../../store/ideas/types/ideaType';
import { MentorRequest } from '../Mentors/MentorRequest';
import { Divider } from '@mui/material';
import { Course } from '../CoursesPage/Course';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <>
      <div className={styles.screen + ' ' + styles.image}>
        <Spacer height={'100px'} />
        <Typography color="white">ВТБ</Typography>
        <Spacer height="70px" />
        <Typography color="white" fontSize="4rem" sx={{ fontWeight: 'bolder' }}>
          featureD
        </Typography>
        <Spacer height="50px" />
        <Typography
          color="white"
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
        <Spacer height={'160px'} />
        <a href={'#ideas'}>
          <ArrowDownward color={'info'} />
        </a>
      </div>
      <Divider color="#101F54" id="ideas" />
      <div
        className={styles.screen}
        style={{ backgroundColor: '#3366AE', color: 'white' }}
      >
        <Spacer height={'100px'} />
        <Typography fontSize={'3rem'} fontWeight={'bolder'}>
          ИДЕИ
        </Typography>
        <Spacer height={'50px'} />
        <Typography
          textAlign="center"
          fontSize={'1.4rem'}
          fontWeight={'100'}
          sx={{ maxWidth: '800px' }}
        >
          Этот раздел помогает сотрудникам почувствовать себя причастными к
          улучшению работы компании. Ты выставляешь свою мысль, за нее голосуют,
          а далее собирается боевая команда для претворения замысла в жизнь.
        </Typography>
        <Spacer height={'60px'} />
        <Idea
          id={-1}
          user={{
            name: 'John',
            surname: 'Dou',
            username: 'VTB User',
            private_key: '',
            public_key: '',
            id: 0,
            roles: [],
          }}
          title={'Какая то очень интересная идея'}
          description={
            'Предлагаю сделать то, от чего всем нам станет лучше жить'
          }
          amount={11}
          status={IdeaStatus.InProgress}
          score={42}
        />
      </div>
      <Divider color="#101F54" />
      <div
        className={styles.screen}
        style={{ backgroundColor: '#D9D9D9', color: '#101F54' }}
      >
        <Spacer height={'100px'} />
        <Typography fontSize={'3rem'} fontWeight={'bolder'}>
          МЕНТОРИНГ
        </Typography>
        <Spacer height={'50px'} />
        <Typography
          textAlign="center"
          fontSize={'1.4rem'}
          fontWeight={'100'}
          sx={{ maxWidth: '800px' }}
        >
          Ищешь наставника? Оставь заявку и на нее откликнется профессионал,
          готовый усовершенствовать твои навыки и помочь в профессиональной
          деятельности. А если ты считаешь себя достаточно компетентным, то
          можешь откликнуться на просьбу товарищей. Естественно, без плюшек ты
          не останешься.
        </Typography>
        <Spacer height={'60px'} />
        <MentorRequest
          id={-1}
          mentor={{
            name: 'Smart',
            surname: 'User',
            username: 'Smart User',
            private_key: '',
            public_key: '',
            id: 0,
            roles: [],
          }}
          user={{
            name: 'Regular',
            surname: 'User',
            username: 'Needs help',
            private_key: '',
            public_key: '',
            id: 0,
            roles: [],
          }}
          title="Нуждаюсь в помощи"
          text="Буду очень рад если кто то возьмется за мое менторство"
        />
      </div>
      <Divider />
      <div
        className={styles.screen}
        style={{ backgroundColor: '#3366AE', color: 'white' }}
      >
        <Spacer height={'30px'} />
        <Typography fontSize={'3rem'} fontWeight={'bolder'}>
          КУРСЫ
        </Typography>
        <Spacer height={'50px'} />
        <Typography
          textAlign="center"
          fontSize={'1.4rem'}
          fontWeight={'100'}
          sx={{ maxWidth: '800px' }}
        >
          Мы заботимся об актуальности знаний своих сотрудников и стараемся
          предоставить самое необходимое для их всестороннего развития. Однако
          бывает довольно сложно побудить себя к прохождению образовательных
          курсов. Наш сервис, используя элементы геймификации, поможет
          замотивировать сотрудников к саморазвитию.
        </Typography>
        <Spacer height={'60px'} />
        <Course
          id={-1}
          name={'Курс повышения квалификации'}
          link={'#'}
          required={false}
          image={
            'https://kakzarabativat.ru/wp-content/uploads/2017/04/Povyshenie-kvalifikacii-personala.jpg'
          }
        />
      </div>
      <Divider color="#101F54" />
      <div
        className={styles.screen}
        style={{ backgroundColor: '#D9D9D9', color: '#101F54' }}
      >
        <Spacer height={'100px'} />
        <Typography fontSize={'3rem'} fontWeight={'bolder'}>
          МАРКЕТПЛЕЙС
        </Typography>
        <Spacer height={'50px'} />
        <Typography
          textAlign="center"
          fontSize={'1.4rem'}
          fontWeight={'100'}
          sx={{ maxWidth: '800px' }}
        >
          Тот самый раздел, где Вы сможете окупить силы, приложенные к
          выполнению корпоративных задач.
        </Typography>
        <Spacer height={'60px'} />
        <Link to="/marketplace" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="info"
            sx={{ borderRadius: '30px', width: '150px', height: '60px' }}
          >
            купить
          </Button>
        </Link>
      </div>
    </>
  );
};
