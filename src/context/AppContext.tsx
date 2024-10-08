import React, { createContext, useContext, useState, useEffect } from 'react';
import { LimitedProduct, Product, Colors } from '../types/Product';

type SortMethodTypes = "newest" | "alpha" | "price";
type AppContextType = {
  handleNotReady: () => void;
  numberOfProductsPerPage: number;
  setNumberOfProductsPerPage: (pages: number) => void;
  clickedProduct: LimitedProduct | undefined;
  setClickedProduct: (product: LimitedProduct | undefined) => void;
  previousCurrentPage: string[];
  setPreviousCurrentPage: (page: string[]) => void;
  favoriteProducts: LimitedProduct[];
  setFavoriteProducts: (products: LimitedProduct[]) => void;
  productsInCart: LimitedProduct[];
  setProductsInCart: (products: LimitedProduct[]) => void;
  theme: 'light' | 'dark';
  setTheme: (products: 'light' | 'dark') => void;
  productsInCartCount: number[];
  setProductsInCartCount: (products: number[]) => void;
  sortMethod: SortMethodTypes;
  setSortMethod: (method: SortMethodTypes) => void;
  productDetails: Product | undefined;
  setProductDetails: (product: Product | undefined) => void;
  fetchedCategory: Product[] | undefined;
  setFetchedCategory: (product: Product[] | undefined) => void;
  products: LimitedProduct[];
  setProducts: (products: LimitedProduct[]) => void;
  isClickedProdyctInFavs: boolean;
  setIsClickedProdyctInFavs: (status: boolean) => void;
  isClickedProdyctInCart: boolean;
  setIsClickedProdyctInCart: (status: boolean) => void;
  isMobMenuOpen: boolean;
  setIsMobMenuOpen: (status: boolean) => void;
  colors: Colors;
};


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<LimitedProduct[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [productsInCartCount, setProductsInCartCount] = useState<number[]>(() => {
    const storedCartItemsCount = localStorage.getItem('productsInCartCount');
    return storedCartItemsCount ? JSON.parse(storedCartItemsCount) : [];
  });

  const [productsInCart, setProductsInCart] = useState<LimitedProduct[]>(() => {
    const storedCartItems = localStorage.getItem('productsInCart');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light';
  });

  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState<number>(8);
  const [clickedProduct, setClickedProduct] = useState<LimitedProduct | undefined>(undefined);
  const [previousCurrentPage, setPreviousCurrentPage] = useState<string[]>(['nothing','nothing']);
  const [sortMethod, setSortMethod] = useState<"newest" | "alpha" | "price">('newest');
  const [productDetails, setProductDetails] = useState<Product | undefined>(undefined);
  const [fetchedCategory, setFetchedCategory] = useState<Product[] | undefined>(undefined);
  const [products, setProducts] = useState<LimitedProduct[]>([]);
  const [isClickedProdyctInFavs, setIsClickedProdyctInFavs] = useState<boolean>(false);
  const [isClickedProdyctInCart, setIsClickedProdyctInCart] = useState<boolean>(false);
  const [isMobMenuOpen, setIsMobMenuOpen] = useState<boolean>(false);
  const colors = {
    black: 'black',
    gold: 'goldenrod',
    yellow: '#e7dea8',
    green: '#92dbcf',
    midnightgreen: '#314b47',
    silver: 'silver',
    spacegray: '#383030',
    red: '#a73a52',
    white: 'white',
    purple: '#d6dbf1',
    coral: '#ffa0a0',
    rosegold: '#e0c5db',
    midnight: '#2a303b',
    spaceblack: '#3d3d3d',
    blue: '#184766',
    pink: 'pink',
    sierrablue: '#5fbbf0',
    graphite: '#332929',
    skyblue: '#3de1ec',
    starlight: 'whitesmoke'
  };

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    localStorage.setItem('productsInCartCount', JSON.stringify(productsInCartCount));
  }, [productsInCart, productsInCartCount]);

  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{
      handleNotReady,
      numberOfProductsPerPage,
      setNumberOfProductsPerPage,
      clickedProduct,
      setClickedProduct,
      previousCurrentPage,
      setPreviousCurrentPage,
      favoriteProducts,
      setFavoriteProducts,
      productsInCart,
      setProductsInCart,
      theme,
      setTheme,
      productsInCartCount,
      setProductsInCartCount,
      sortMethod,
      setSortMethod,
      productDetails,
      setProductDetails,
      fetchedCategory,
      setFetchedCategory,
      products,
      setProducts,
      isClickedProdyctInFavs,
      setIsClickedProdyctInFavs,
      isClickedProdyctInCart,
      setIsClickedProdyctInCart,
      isMobMenuOpen,
      setIsMobMenuOpen,
      colors
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
