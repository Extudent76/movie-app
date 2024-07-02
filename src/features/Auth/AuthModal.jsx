import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authThunks';
import styles from './AuthModal.module.css';
import Button from '../../shared/components/Button/Button';
import { selectIsAuthenticated, selectAuthError } from '../Selector/selectors';

const AuthModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username, password }));
    }
  };

  if (!isOpen || isAuthenticated) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Авторизация</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonGroup}>
            <Button type="submit" className={styles.submitButton} >Войти</Button>
            <Button type="button" className={styles.cancelButton} onClick={onClose}>Отменить</Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
