import React from 'react';
import { NavLink, Link } from "react-router-dom";
import styles from './Header.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg';
import cartIcon from '../../img/icons/CartIcon.svg';
import LogoIconDT from '../../img/icons/LogoIcon--DarkTheme.svg';
import cartIconDT from '../../img/icons/CartIcon--DarkTheme.svg';
import favIcon from '../../img/icons/FavoritesIcon.svg';
import favIconDT from '../../img/icons/FavoritesIcon--DarkTheme.svg';
import { Theme } from '../Theme';
import { useAppContext } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={`${theme === 'dark' ? LogoIconDT : LogoIcon}`}
          alt="Nice Gadgets Logo"
          className={styles.logo}
        />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavLink to="/" exact className={styles.navItem} activeClassName={styles.isActive}>
            Home
          </NavLink>

          <NavLink to="/phones" className={styles.navItem} activeClassName={styles.isActive}>
            Phones
          </NavLink>

          <NavLink to="/tablets" className={styles.navItem} activeClassName={styles.isActive}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" className={styles.navItem} activeClassName={styles.isActive}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actionsContainer}>
          <div className={styles.actions}>
            <NavLink to="/favorites" className={styles.actionItem} activeClassName={styles.isActive}>
              <div className={styles.actionIcon}>
                <img
                  src={`${theme === 'dark' ? favIconDT : favIcon}`}
                  alt="Favorites"
                  className={styles.icon}
                />
              </div>
            </NavLink>

            <NavLink to="/cart" className={styles.actionItem} activeClassName={styles.isActive}>
              <div className={styles.actionIcon}>
                <img
                  src={`${theme === 'dark' ? cartIconDT : cartIcon}`}
                  alt="Cart"
                  className={styles.icon}
                />
              </div>
            </NavLink>

            <div className={styles.actionItem}>
              <Theme />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
