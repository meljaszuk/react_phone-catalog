import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import favoritesIconSrc from '../../img/icons/FavoritesIcon.svg';
import { useAppContext } from '../../context/AppContext';
import favoritesIconSrcDT from '../../img/icons/FavoritesIcon--DarkTheme.svg';
import cartIconSrc from '../../img/icons/CartIcon.svg';
import cartIconSrcDT from '../../img/icons/CartIcon--DarkTheme.svg';
import { Theme } from '../Theme';

export const MobileMenu: React.FC = () => {
  const { setIsMobMenuOpen, theme, productsInCartCount, favoriteProducts } =
    useAppContext();
  const [cartCount, setCartCount] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuStatus = () => {
    setIsMobMenuOpen(false);
  };

  useEffect(() => {
    setIsMobMenuOpen(false);
  }, [windowWidth]);

  useEffect(() => {
    let totalCartCount = productsInCartCount.reduce(
      (acc, count) => acc + count,
      0,
    );
    setCartCount(totalCartCount);
  }, [productsInCartCount]);

  return (
    <div className={styles.topWrapper}>
      <div className={styles.menuOverlay}>
        <div className={styles.linkWrapper}>
          <nav className={styles.nav} role="navigation">
            <NavLink
              to="/"
              exact
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={styles.item}
              onClick={handleMenuStatus}
              activeClassName={styles.isActive}
            >
              Accessories
            </NavLink>
          </nav>
        </div>
      </div>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={styles.action}
          onClick={handleMenuStatus}
          activeClassName={styles.isActive}
        >
          <div className={styles.actionIcon}>
            <div className={styles.iconWrapper}>
              <img
                src={`${theme === 'dark' ? favoritesIconSrcDT : favoritesIconSrc}`}
                alt="Favorites"
              />
              <div
                className={`${favoriteProducts.length > 0 ? styles.count : styles.hidden}`}
              >
                <div className={styles.countText}>
                  {favoriteProducts.length}
                </div>
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={styles.action}
          onClick={handleMenuStatus}
          activeClassName={styles.isActive}
        >
          <div className={styles.actionIcon}>
            <div className={styles.iconWrapper}>
              <img
                src={`${theme === 'dark' ? cartIconSrcDT : cartIconSrc}`}
                alt="Cart"
                className={styles.icon}
              />
              <div
                className={`${cartCount > 0 ? styles.count : styles.hidden}`}
              >
                <div className={styles.countText}>{cartCount}</div>
              </div>
            </div>
          </div>
        </NavLink>

        <div className={styles.action}>
          <Theme />
        </div>
      </div>
    </div>
  );
};
