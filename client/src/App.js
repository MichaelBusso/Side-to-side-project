import { BrowserRouter as Routar, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Info from './components/Info';
import TodoWrapper from './components/TodoWrapper';
import PostWrapper from './components/PostWrapper';

function App() {
  return (
    <Routar>
      <div className="App">
        <Routes>
          <Route index element={<Navigate to="/Login" />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Home/:username' element={<Home />} />
          <Route path='/Home/:username/Info' element={<Info />} />
          <Route path='/Home/:username/Todos' element={<TodoWrapper />} />
          <Route path='/Home/:username/Posts' element={<PostWrapper />} />
        </Routes>
      </div>
    </Routar>
  );
}

export default App;
