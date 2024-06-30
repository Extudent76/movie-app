import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Auth/authSlice';
import styles from './Header.module.css';
import UserIcon from './UserIcon';
import Button from '../../shared/components/Button/Button';
import AuthModal from '../../features/Auth/AuthModal';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__title}>Фильмопоиск</h1>
        <div className={styles.header__auth}>
          {isAuthenticated ? (
            <>
              <div className={styles.header__user_icon_wrapper}>
                <UserIcon />
              </div>
              <Button className={styles.header__button_exit} onClick={handleLogout}>Выйти</Button>
            </>
          ) : (
            <Button className={styles.header__button_entry} onClick={handleLoginClick}>Войти</Button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}

export default Header;

