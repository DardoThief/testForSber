import React, {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './styles.module.scss';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AppDispatch, FormDataType, RootState } from "./types/types";
import { getArray, putData } from "./redux/action";

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: '10px',
    width: '100%',
  },
}));
const schema = yup.object().shape({
  name: yup.string()
      .required('Введите своё имя.')
      .matches(/[а-яА-Я]/, 'Используйте только кирилицу.')
      .min(2, 'Ваше имя не может быть меньше 2 букв'),
  surname: yup.string()
      .required('Введите своё отчество.')
      .matches(/[а-яА-Я]/, 'Используйте только кирилицу.')
      .min(3, 'Ваше отчество должно быть не меньше 3 букв.'),
  lastname: yup.string()
      .required('Введите свою фамилию.')
      .matches(/[а-яА-Я]/, 'Используйте только кирилицу.')
      .min(2, 'Ваша фамилия должна быть не меньше 2 букв.'),
  age: yup.number()
      .required('Введите свой возраст.')
      .max(3, 'Ваш возраст не может содержать больше трёх цифр.')
});

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const WITH_SUR_NAME = 'WITH_SUR_NAME';

const App = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fetchArray = useAppSelector(state => state.toolkit.array);
  const [isSurName, setIsSurName] = useState(WITH_SUR_NAME);

  const onSubmit = (data: FormDataType) => {
    const newData = {
      name: data.name,
      lastName: data.lastName,
      age: data.age
    };
    if (isSurName === WITH_SUR_NAME) {
      Object.assign(newData, { surName: data.surName });
    }
    dispatch(putData(newData));
  }

  useEffect(() => {
    dispatch(getArray());
  }, []);

  useEffect(() => {
    setIsSurName(fetchArray);
  }, [fetchArray]);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            id='select'
            label='surName'
            className={classes.textField}
            variant='outlined'
            name='existSurName'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsSurName(event.target.value)}
            fullWidth
            select
          >
            {fetchArray && fetchArray.length > 0 && fetchArray.map((item: string, index: number) => (
              <MenuItem value={index}>{item === WITH_SUR_NAME ? 'С отчеством' : 'Без отчества' }</MenuItem>
              ))}
          </TextField>
          <TextField
              {...register("name")}
              className={classes.textField}
              fullWidth
              type='text'
              variant="outlined"
              label="Имя"
          />
          {errors?.name && <p>{errors?.name.message}</p>}
          <TextField
              {...register("lastName")}
              className={classes.textField}
              fullWidth
              type='text'
              variant="outlined"
              label="Фамилия"
          />
          {errors?.lastName && <p>{errors?.lastName.message}</p>}
          {(isSurName === WITH_SUR_NAME) &&
          <>
            <TextField
                {...register("surname")}
                className={classes.textField}
                fullWidth
                type='text'
                variant="outlined"
                label="Отчество"
            />
            {errors?.surname && <p>{errors?.surname.message}</p>}
          </>
          }
          <TextField
              {...register("age")}
              className={classes.textField}
              fullWidth
              type="number"
              variant="outlined"
              label="Полный возраст"
          />
          {errors?.age && <p>{errors?.age.message}</p>}
          </div>
        <Button type="submit">Send info</Button>
      </form>
  );
};

export default App;