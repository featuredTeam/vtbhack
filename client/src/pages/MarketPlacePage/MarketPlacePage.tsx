import { useAuth } from '../../store/auth/hooks/useAuth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {

    setLoading,
    setProfile,
} from '../../store/profile/profileSlice';
import { useProfile } from '../../store/profile/hooks/useProfile';
import {
    Button,
    CircularProgress,

} from '@mui/material';
import { Spacer } from '../../components/common/Spacer';
import { Stack } from '@mui/material';
import { getItems } from '../../store/items/actions/getIdeas';


export const MarketPlacePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userInfo, isAuthorized } = useAuth();
    const { balance } =
        useProfile();

    const { items, loading } = useAppSelector((store) => store.items);

    useEffect(() => {
        dispatch(setLoading(true));
        if (userInfo)
            dispatch(setProfile(userInfo));

        dispatch(setLoading(false));
    }, [userInfo]);

    useEffect(() => {
        dispatch(getItems());
    }, [])

    if (loading) {
        return <CircularProgress />;
    }

    const buyItem =(id: number) => {
        console.log(id);
    }

    return (
        <>
        {isAuthorized && <>Ваш баланс: {balance}</>        }
            <Stack
                direction="row"
                sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                {
                    items?.map((item) => {
                        return (<div>{item.name}
                        {isAuthorized && (
                            <Button
                            onClick={() => {
                              buyItem(item.id);
                            }}
                            sx={{ width: '100%' }}
                            variant="outlined"
                          >
                            Купить
                          </Button>
                        )}</div>);
                    })
                }
                <Spacer width="50px" />
            </Stack>
        </>
    );
};
