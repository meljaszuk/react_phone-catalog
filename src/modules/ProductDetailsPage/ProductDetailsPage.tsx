import React, { useState, useEffect } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { Description } from './components/Description';
import { MainControls } from './components/MainControls';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GoBack } from '../../components/GoBack';
import { ProductSlider } from '../../components/ProductSlider';
// eslint-disable-next-line no-unused-vars
import { LimitedProduct, Product } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1);

  const {
    clickedProduct,
    setClickedProduct,
    productDetails,
    setProductDetails,
    fetchedCategory,
    setFetchedCategory,
    products,
    setProducts,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://meljaszuk.github.io/react_phone-catalog/api/products.json`,
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, [location.pathname]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const slug = location.pathname.split('/').pop();
        let fetchedProduct = products.find(
          (item: LimitedProduct) => item.itemId === slug,
        );

        if (fetchedProduct) {
          setClickedProduct(fetchedProduct);
          const response = await fetch(
            `https://meljaszuk.github.io/react_phone-catalog/api/${fetchedProduct.category}.json`,
          );
          const data = await response.json();
          setFetchedCategory(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategory();
  }, [products, location.pathname, clickedProduct]);

  useEffect(() => {
    if (fetchedCategory && clickedProduct) {
      const productDetails = fetchedCategory.find(
        item => item.id === clickedProduct.itemId,
      );
      setProductDetails(productDetails);
    }
  }, [fetchedCategory, clickedProduct, setProductDetails]);

  const [dynamicColor, setDynamicColor] = useState<string>('');
  const [dynamicCapacity, setDynamicCapacity] = useState<string>('');
  const [productGroup, setProductGroup] = useState<string>('');

  useEffect(() => {
    if (fetchedCategory && clickedProduct && products) {
      setIsLoading(false);
    }
  }, [productDetails, fetchedCategory, clickedProduct, products]);

  useEffect(() => {
    const slug = location.pathname.split('/').pop();
    let fetchedProduct = fetchedCategory?.find(
      (item: Product) => item.id === slug,
    );

    if (fetchedProduct) {
      setProductGroup(fetchedProduct.namespaceId);
    }
  }, [productDetails]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productGroup]);

  return (
    <div className={styles.productDetailsPage}>
      <main className={styles.mainContent}>
        {isLoading ? (
          <Loader />
        ) : !clickedProduct ? (
          <div className={styles.noProductContainer}>
            <div className={styles.noProduct}></div>
            <img
              src="img/product-not-found.png"
              className={styles.imageNotFound}
            />
          </div>
        ) : (
          <div className={styles.container}>
            {productDetails && (
              <Breadcrumbs category={productDetails.category} />
            )}
            <PreviousPage category={category} />
            <GoBack />
            <h2 className={styles.title}>{clickedProduct.name}</h2>
            <ImageGallery />
            <MainControls
              dynamicColor={dynamicColor}
              setDynamicColor={setDynamicColor}
              dynamicCapacity={dynamicCapacity}
              setDynamicCapacity={setDynamicCapacity}
            />
            <Description />
            <TechSpecs />
          </div>
        )}
        {clickedProduct && (
          <ProductSlider
            title="You may also like"
            category={clickedProduct.category}
            sortMethod={'random'}
            count={5}
          />
        )}
      </main>
    </div>
  );
};
