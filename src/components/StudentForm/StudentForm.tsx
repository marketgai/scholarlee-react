import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseAge } from '../../redux/slices/rootSlice';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Input } from '../sharedComponents';

interface StudentFormProps {
  id?: string;
  data?: {};
}

interface StudentState {
  firstName: string;
  age: number;
}

export const StudentForm = (props: StudentFormProps) => {
  const dispatch = useDispatch();
  let { studentData, getData } = useGetData();
  const store = useStore();
  const name = useSelector<StudentState>((state) => state.firstName);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any, event: any) => {
    console.log(props.id);
    //i dont get this props.id!... why ! at end?
    if (props.id!) {
      await server_calls.update(props.id, data);
      console.log(`Updated ${data} ${props.id}`);
      event.target.reset();
      window.location.reload();
    } else {
      dispatch(chooseName(data.firstName));
      dispatch(chooseAge(data.age));
      await server_calls.create(store.getState());
      event.target.reset();
      window.location.reload();
      // server_calls.create(data);
      //something wrong with data/reduxstore
    }
  };
  return (
    // <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">Student first Name</label>
      <Input {...register('firstName')} name="firstName" placeholder="firstName" />
      <label htmlFor="lastName">Last Name</label>
      <Input {...register('lastName')} name="lastName" placeholder="lastName" />
      <label htmlFor="age">age</label>
      <Input {...register('age')} name="age" placeholder="age" />
      <label htmlFor="phone">phone</label>
      <Input {...register('phone')} name="phone" placeholder="phone" />
      <label htmlFor="grade">grade</label>
      <Input {...register('grade')} name="grade" placeholder="grade" />
      <label htmlFor="family_id">family_id number</label>
      <Input {...register('family_id')} name="family_id" placeholder="family_id" />
      <Button type="submit">Submit</Button>
    </form>
    // </div>
  );
};
