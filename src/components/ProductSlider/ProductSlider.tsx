import React, { useEffect, useState, useMemo } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductPhone } from '../../types/Product';
import styles from './ProductSlider.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';

type ProductSliderProps = {
  title: string;
  count: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({ title, count }) => {
  const [products, setProducts] = useState<ProductPhone[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/phones.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const displayedItems = useMemo(() => {
    return products.slice(-count);
  }, [products]); // SIMPLIFICATION - MUST BE BASED ON SORTING - WILL BE UPDATED

  const [position, setPosition] = useState<number>(0);
  const [positionCount, setPositionCount] = useState<number>(0);

  const handlePositionCount = (change: number) => {
    setPositionCount((prev) => prev + change);
  };

  const handleNextSlide = () => {
    handlePositionCount(1);
    setPosition((prevPosition) => prevPosition - 292);
  };

  const handlePreviousSlide = () => {
    handlePositionCount(-1);
    setPosition((prevPosition) => prevPosition + 292); // Aktualizacja pozycji
  };

  console.log(positionCount);

  return (
    <div className={styles.productSlider}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttonContainer}>
          <button
            className={styles.arrowButton}
            onClick={() => {
              if (positionCount !== 0) {
                handlePreviousSlide();
              }
            }}
          >
            <img src={ChevronIcon} alt="scroll right" />
          </button>

          <button
            className={styles.arrowButton}
            onClick={() => {
              if (positionCount !== 6) { // FIXED NUMBER=6 NEED TO BE CORRECTED - depends on number of items and
                handleNextSlide();
              }
            }}
          >
            <img src={ChevronIcon} alt="scroll right" className={styles.iconNext} />
          </button>
        </div>
      </div>

      <div className={styles.topContainer}>
        <div className={styles.sliderContainer}>
          <div className={styles.slideWraper}>
            <ul
              className={styles.slideList}
              style={{
                transform: `translateX(${position}px)`,
              }}
            >
              {displayedItems.map((product) => (
                <li key={product.id} className={styles.productCard}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
