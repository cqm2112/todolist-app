import React, { useState } from 'react';
import LogoTmk from '../assets/logo-tmk.png';
import Profile from '../assets/user-profile.png';
import Menu from './Menu';

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <header className={styles.header}>
      <img className={styles.img} src={LogoTmk} alt="Logo" />
      <div className={styles.rightSection}>

        <button className={styles.button} onClick={() => setModalShow(true)} id='MenuButton'><img className="w-8" src={Profile} alt="Logo" /></button>
      </div>
      <Menu show={modalShow} onHide={() => setModalShow(false)}></Menu>
    </header>
  );
};

const styles = {
  header: 'sticky top-0 h-24 bg-white flex justify-between items-center z-10 p-4',
  img: 'w-96',
  rightSection: 'flex items-center',
  button: 'ml-auto text-white p-2 rounded-md hover:bg-blue-600',
};

export default Header;





