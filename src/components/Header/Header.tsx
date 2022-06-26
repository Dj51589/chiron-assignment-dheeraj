import React, { FC } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/chiron-logo.svg'
import userphoto from '../../assets/images/user.jpeg';
import search from '../../assets/images/search.png';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
  <div className={`flex-container v-align-c w-100 ${styles["header"]}`}>
    <div className={`${styles["logo"]} flex-container justify-center v-align-c`}>
      <img src={logo} alt="chiron" />
    </div>
    <div className={`${styles['search-field']} flex-1 flex-container m-l-xs v-align-c`}>
      <img src={search} alt="search" className={styles['search']} />
      <input placeholder="Search anything" className="m-l-xxs"></input>
    </div>
    <div className={`${styles['profile']} flex-container justify-center v-align-c`}>
      <div className={styles['user-image']}>
        <img src={userphoto} alt="chiron" />
      </div>
      <div className="flex-container flex-column justify-center v-align-c">
        <span>Mr Dheeraj</span>
        <span className={styles['role']}>Patient</span>
      </div>
    </div>
  </div>
);

export default Header;
