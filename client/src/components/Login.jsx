import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './components style/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Your name is required!'),
    password: yup.string().min(4, 'The password should be at last 4 characters').required('Password required!'),
  })

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const submitHandler = async (formObj) => {
    try {
      const user = await fetchUsers(formObj.name, formObj.password);
      alert('WELCOME!');
      navigate(`/Home/${user[0].username}`);
      localStorage.setItem('activeUser', JSON.stringify(user));
      localStorage.setItem('activeUserHeaders', JSON.stringify(`${formObj.name}:${formObj.password}`));
    } catch (error) {
      alert('Acess denied! \nPlease check the user name and password again');
    }
  }

  const fetchUsers = async (name, password) => {
    const { data } = await axios.post(`http://localhost:4000/login`, null, { headers: { auth: `${name}:${password}` } });
    return data;
  }

  return (
    <div className='form_container_login'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='form_login'>
        <div className='inputs_login' >
          <input type="text" placeholder="Name..." {...register("name")} />
          <input type="text" placeholder="Password..." {...register("password")} />
        </div>
        <div className='btn_login'>
          <input type="submit" value='Login' />
        </div >
      </form>
    </div>
  )
}

export default Login;