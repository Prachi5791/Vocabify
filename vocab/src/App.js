import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Page from './page';
// import Translate from './components/Translate';
// import VocabularyQuestion from './components/VocabuloryQuestion';
import { WordProvider } from './ApiCall/WordContext';
// import TextToSpeech from './components/TextToSpeech';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import { UserContext, UserProvider } from './ApiCall/userContext';
import Progress from './Pages/Progress';
// import QuestionPage from './Pages/QuestionPage';
import Quiz from './Pages/Quiz';
import { useContext } from 'react';

function App() {
  const { isAuthenticated } = useContext(UserContext) || {} ; // Get authentication status
  console.log(isAuthenticated);
  

  return (
    <BrowserRouter>
      <UserProvider>
        <WordProvider>
          <Routes>
            <Route path='/' element={<Navigate to='/landing' />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={isAuthenticated ? <Navigate to="/login" /> : <Dashboard />} />
            {/* <Route path='/phonetics' element={<Page />} />
            <Route path='/translate' element={<Translate />} />
            <Route path='/Quiz' element={<VocabularyQuestion />} />
            <Route path='/text' element={<TextToSpeech />} /> */}
            <Route path='/progress' element={<Progress />} />
            <Route path='/hello/:level/:module' element={<Quiz />} />
          </Routes>
        </WordProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;