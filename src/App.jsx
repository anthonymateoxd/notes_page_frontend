import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthProvider';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './secure/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
// import NotesPage from './pages/NotesPage';
import { FolderProvider } from './context/FolderProvider';
import { NotesProvider } from './context/NotesProvider';
import Principal from './components/Notes/Principal';
import Header from 'remote/Header';

function App() {
  return (
    <AuthProvider>
      <FolderProvider>
        <NotesProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/login-page'
                element={<LoginPage />}
              />
              <Route
                path='/register'
                element={<RegisterPage />}
              />
              <Route
                path='/*'
                element={<PageNotFound />}
              />
              <Route element={<ProtectedRoute />}>
                <Route
                  path='/profile'
                  element={<ProfilePage />}
                />
                <Route
                  path='/folder/:id'
                  element={<Principal />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotesProvider>
      </FolderProvider>
    </AuthProvider>
  );
}

export default App;
