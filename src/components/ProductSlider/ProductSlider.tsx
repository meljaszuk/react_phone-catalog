import styles from './ProductSlider.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';
import React, {useState} from 'react';



export const ProductSlider: React.FC = () => {

  const sliderImages = [
    './img/banner-1.png',
    './img/banner-2.png',
    './img/banner-3.png'
  ]

  let [displayedImageIndex, setDisplayedImageIndex] = useState(0)
  console.log(displayedImageIndex)
  const incrementDisplayedImageIndex = () => {
    if(displayedImageIndex === sliderImages.length-1) {
      displayedImageIndex = 0;
      console.log(displayedImageIndex)
    } else {
      displayedImageIndex++
      console.log(displayedImageIndex)
    }
    setDisplayedImageIndex(displayedImageIndex)
  }

  const decrementDisplayedImageIndex = () => {
    if(displayedImageIndex === 0) {
      displayedImageIndex = (sliderImages.length-1)
      console.log(displayedImageIndex)
    } else {
      displayedImageIndex--
      console.log(displayedImageIndex)
    }
    setDisplayedImageIndex(displayedImageIndex)
  }



  return (
    <div className={styles.ProductSlider}>
      <div className={styles.topWrapper}>
        <div className={styles.buttons}>
          <button className={styles.arrowButton} onClick={decrementDisplayedImageIndex}>
            <img src={ChevronIcon} alt="scroll" className={styles.iconPrev} />
          </button>

          <div className={styles.container}>
            <div
              className={styles.sliderWrapper}
              style={{ transform: `translateX(-${displayedImageIndex * 100}%)` }}
            >
              {sliderImages.map((image, index) => (
                <img key={index} src={image} className={styles.slide} alt={`Slide ${index + 1}`} />
              ))}
            </div>
          </div>

          <button className={styles.arrowButton} onClick={incrementDisplayedImageIndex}>
            <img src={ChevronIcon} alt="scroll" className={styles.iconNext} />
          </button>
        </div>
      </div>
    </div>
  );
};
