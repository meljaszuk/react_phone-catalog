import React, { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './FavoritesPage.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { useAppContext } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Footer } from '../../components/Footer';
import { GoBack } from '../../components/GoBack';

export const FavoritesPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { favoriteProducts, setFavoriteProducts } = useAppContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    if (storedFavorites !== null && storedFavorites.length !== 0) {
      setFavoriteProducts(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <Header />
      <PreviousPage category={category} />

      <div className={styles.favoritesPage}>
        <Breadcrumbs category={category} />

        <div className={styles.topContainer}>
          <div className={styles.topLeft}>
            <button className={styles.goBackButton}>
              <img
                src={chevronIcon}
                alt="home"
                className={styles.chevronIcon}
              />
              <div className={styles.goBackText}>
                <GoBack />
              </div>
            </button>
          </div>
          <h1 className={styles.title}>Favorites</h1>
          <p className={styles.count}>
            {`${favoriteProducts.length} item${favoriteProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className={styles.emptyContainer}>
          <div className={styles.container}>
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((favProduct, index) => (
                <div className={styles.product} key={index}>
                  <ProductCard product={favProduct} />
                </div>
              ))
            ) : (
              <p className={styles.label}>No favorites yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
