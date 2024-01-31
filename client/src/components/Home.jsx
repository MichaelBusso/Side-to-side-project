import './components style/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const buttons = ['Info', 'Todos', 'Posts', 'Log-out'];
  const user = JSON.parse(localStorage.getItem('activeUser'));

  const navHandler = (target) => {
    if (target === 'Log-out') {
      navigate('/');
      localStorage.removeItem('activeUser');
      localStorage.removeItem('activeUserHeaders');
    }
    else {
      navigate(`/Home/${user[0].username}/${target}`);
    }
  }

  return (
    <div>
      <div className='container'>
        <h1>Hello dear {user[0].name}!</h1>
        <div className='body'>
          {buttons.map((btn, index) => <div key={index} onClick={() => navHandler(btn)} className={`btn ${btn}`}>{btn}</div>)}
        </div>
      </div>
    </div>
  )
}

export default Home;