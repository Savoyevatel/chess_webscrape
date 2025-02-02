import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import WhiteScreen from './screens/WhiteScreen';
import BlackScreen from './screens/BlackScreen';
import LoginScreen from './screens/LoginScreen';
import OpeningScreen from './screens/OpeningScreen';
import RegisterScreen from './screens/RegisterScreen';
import SaveScreen from './screens/SaveScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/whitescreen' element={<WhiteScreen />} />
            <Route path='/blackscreen' element={<BlackScreen />} />
            <Route path='/opening-details/:heading/:moves/:defenseName' element={<OpeningScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path="/admin/savescreen" element={<SaveScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
