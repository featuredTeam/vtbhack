import { AppDispatchType } from '../../store';
import { axios } from '../../../utils/axiosInstance';
import { ItemType } from '../types/itemType';
import { setItems } from '../itemsSlice';

export const getItems = () => async (dispatch: AppDispatchType) => {
  const response = await axios.get<ItemType[]>('items');

  if (response) {
    dispatch(setItems(response.data));
  }
};
