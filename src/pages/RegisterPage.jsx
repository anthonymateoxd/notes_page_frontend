import { useState, useEffect } from 'react';
import '../styles/RegisterPage.css';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const { aggUserRequest, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  });

  useEffect(() => {
    // Validar que las contraseñas coincidan
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }

    // Validar el formulario completo
    const isValid =
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      agreeTerms;

    setIsFormValid(!!isValid);
  }, [email, password, confirmPassword, agreeTerms]);

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Aquí iría la lógica de registro
    aggUserRequest({ email, password });
    navigate('/profile');
  };

  // Función para calcular la fortaleza de la contraseña
  const calculatePasswordStrength = () => {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 30;

    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = () => {
    const strength = calculatePasswordStrength();
    if (strength < 40) {
      return 'var(--error)';
    } else if (strength < 70) {
      return 'var(--warning)';
    }
    return 'var(--success)'; // No need for an 'else' here, this will cover strength >= 70
  };

  const getPasswordStrengthText = () => {
    const strength = calculatePasswordStrength();
    if (strength < 40) return 'Débil';
    if (strength < 70) return 'Media';
    return 'Fuerte';
  };

  return (
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-left'>
          <div className='register-decoration'>
            <div className='decoration-item notes'></div>
            <div className='decoration-item pen'></div>
            <div className='decoration-item highlighters'></div>
            <div className='decoration-item paper-plane'></div>
          </div>
          <div className='register-quote'>
            <h2>Comienza tu journey organizativa</h2>
            <p>
              Únete a miles de usuarios que ya están transformando cómo capturan
              y organizan su conocimiento
            </p>
          </div>
        </div>

        <div className='register-right'>
          <div className='register-form-container'>
            <div className='register-header'>
              <h1>Crear una cuenta</h1>
              <p>Regístrate para comenzar a organizar tus ideas</p>
            </div>

            <form
              className='register-form'
              onSubmit={handleSubmit}
            >
              <div className='input-group'>
                <label htmlFor='email'>Correo electrónico</label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='tu@email.com'
                  required
                />
              </div>

              <div className='input-group'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Crea una contraseña segura'
                  required
                  className={passwordError ? 'error' : ''}
                />
                <div className='password-strength'>
                  <div className='strength-bar'>
                    <div
                      className='strength-level'
                      style={{
                        width: `${calculatePasswordStrength()}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    ></div>
                  </div>
                  <span className='strength-text'>
                    {password
                      ? getPasswordStrengthText()
                      : 'Seguridad de la contraseña'}
                  </span>
                </div>
              </div>

              <div className='input-group'>
                <label htmlFor='confirmPassword'>Confirmar contraseña</label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder='Repite tu contraseña'
                  required
                  className={passwordError ? 'error' : ''}
                />
                {passwordError && (
                  <div className='error-message'>
                    <span className='error-icon'>⚠</span>
                    {passwordError}
                  </div>
                )}
              </div>

              <div className='register-options'>
                <div className='terms-agreement'>
                  <input
                    type='checkbox'
                    id='agreeTerms'
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    required
                  />
                  <label htmlFor='agreeTerms'>
                    Acepto los <a href='#terms'>Términos de servicio</a> y la{' '}
                    <a href='#privacy'>Política de privacidad</a>
                  </label>
                </div>
              </div>

              <button
                type='submit'
                className='register-button'
                disabled={!isFormValid}
              >
                Crear cuenta
              </button>
            </form>

            <div className='register-divider'>
              <span>o regístrate con</span>
            </div>

            <div className='social-register'>
              <button
                type='button'
                className='social-button google'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                >
                  <path
                    d='M16.5 9.20455C16.5 8.56636 16.4455 7.95273 16.3409 7.36364H9V10.845H13.2955C13.1155 11.97 12.4773 12.9232 11.5091 13.5564V15.5636H14.1136C15.6182 14.1682 16.5 11.9318 16.5 9.20455Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M9 17C11.2955 17 13.2409 16.1705 14.6136 14.7636L12.0091 12.7564C11.2409 13.3364 10.2545 13.6591 9 13.6591C6.79545 13.6591 4.95909 12.2045 4.28182 10.2182H1.58636V12.2909C2.96818 15.0318 5.73636 17 9 17Z'
                    fill='#34A853'
                  />
                  <path
                    d='M4.28182 10.2182C4.09091 9.70909 3.97727 9.15909 3.97727 8.59091C3.97727 8.02273 4.09091 7.47273 4.28182 6.96364V4.89091H1.58636C1.00455 6.07273 0.681824 7.39091 0.681824 8.59091C0.681824 9.79091 1.00455 11.1091 1.58636 12.2909L4.28182 10.2182Z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M9 3.34091C10.3318 3.34091 11.5136 3.79545 12.4227 4.56818L14.6682 2.32273C13.2364 1.03182 11.2955 0.318182 9 0.318182C5.73636 0.318182 2.96818 2.28636 1.58636 4.89091L4.28182 6.96364C4.95909 4.97727 6.79545 3.34091 9 3.34091Z'
                    fill='#EA4335'
                  />
                </svg>
                Google
              </button>

              <button
                type='button'
                className='social-button github'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                </svg>
                GitHub
              </button>
            </div>

            <div className='login-link'>
              <p>
                ¿Ya tienes una cuenta?{' '}
                <a
                  onClick={() => navigate('/login-page')}
                  style={{ cursor: 'pointer' }}
                >
                  Iniciar Session
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
