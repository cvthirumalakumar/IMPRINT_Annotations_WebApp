import './App.css';
import LoginPage from "./components/LoginPage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import MainPage from "./components/MainPage"

function App() {

  const [user] = useAuthState(auth);
 
  return (
    <div className="App">
      <section>
      { user ? <MainPage /> : <LoginPage />}
      </section>
    </div>
  );
}

export default App;
