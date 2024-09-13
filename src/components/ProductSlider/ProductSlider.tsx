import React, { useEffect, useState, useRef } from 'react';
import { ProductCard } from '../ProductCard';
import { LimitedProduct } from '../../types/Product';
import styles from './ProductSlider.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import chevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import { useAppContext } from '../../context/AppContext';
import { fetchProducts } from '../../utils/fetchProducts';

type ProductSliderProps = {
  title: string;
  sortMethod: 'alpha' | 'price' | 'newest' | 'hot' | 'random';
  category: string;
  count: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({ title, category, sortMethod, count }) => {
  const [products, setProducts] = useState<LimitedProduct[]>([]);
  const { theme } = useAppContext();
  const sliderRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [positionCount, setPositionCount] = useState<number>(0);
  const [displayedItems, setDisplayedItems] = useState<LimitedProduct[] | []>([])
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [cardWidth, setCardWidth] = useState<number>(0)

  useEffect(() => {
    if (sliderRef?.current?.clientWidth) {
      const cardWidth = sliderRef?.current?.clientWidth / displayedItems.length
      setCardWidth(cardWidth)
    }

  }, [windowWidth,displayedItems])
  useEffect(() => {
    const fetchProductData = async () => {
      const filteredData = await fetchProducts(category, sortMethod, count);
      filteredData.length = count;
      setProducts(filteredData);
    };

    fetchProductData();
  }, []);

useEffect(() => {
  setDisplayedItems(products)
}, [products])


  const getScrollStep = () => {
    if (sliderRef.current) {
      console.log('SLIDER WIDTH',sliderRef.current.clientWidth)
      return sliderRef.current.clientWidth * (1 / products.length);
    }
    return 0;
  };

  const handlePositionCount = (change: number) => {
    setPositionCount((prev) => prev + change);
  };

  const handleNextSlide = () => {
    const step = getScrollStep();
    console.log(step)
    if (step > 0) {
      handlePositionCount(1);
      setPosition((prevPosition) => prevPosition - step);
    }
  };

  const handlePreviousSlide = () => {
    const step = getScrollStep();
    if (step > 0) {
      handlePositionCount(-1);
      setPosition((prevPosition) => prevPosition + step);
    }
  };

  useEffect(() => {
    setPosition(0);
    setPositionCount(0)
  }, [windowWidth])

  // Funkcja resetująca pozycję przewijania
  const resetSliderPosition = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0; // Resetujemy pozycję przewijania do początku
    }
  };

  useEffect(() => {
    // Funkcja wywoływana przy zmianie rozmiaru okna
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Aktualizujemy szerokość okna w stanie
    };

    // Nasłuchiwanie na zdarzenie resize
    window.addEventListener('resize', handleResize);

    // Czyszczenie nasłuchiwacza przy unmountowaniu komponentu
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Resetowanie slidera za każdym razem, gdy zmienia się szerokość okna
  useEffect(() => {
    resetSliderPosition();

  }, [windowWidth]); // Zależność od szerokości okna

  useEffect(()=> {
    let step;
    if(sliderRef?.current?.clientWidth) {

      step = sliderRef.current.clientWidth / displayedItems.length
    }

    console.log('WW',windowWidth, 'POSITION', position, 'step',step )
  },[windowWidth, position])

  return (
    <div className={styles.productSlider}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.arrowButton} ${position === 0 ? styles.disabled : ""}`}
            onClick={() => {
              if (positionCount !== 0) {
                handlePreviousSlide();
              }
            }}
          >
            <img src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`} alt="scroll left" />
          </button>

          <button
            className={`${styles.arrowButton} ${sliderRef?.current?.clientWidth === -position + cardWidth ? styles.disabled : ""}`}
            onClick={() => {
              if (positionCount !== displayedItems.length) {
                handleNextSlide();
              }
            }}
          >
            <img src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`} alt="scroll right" className={styles.iconNext} />
          </button>
        </div>
      </div>

      <div className={styles.topContainer}>
        <div className={styles.sliderContainer}>
          <div className={styles.slideWraper}>
            <ul
              className={styles.slideList}
              ref={sliderRef}
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
