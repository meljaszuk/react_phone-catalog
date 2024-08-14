import styles from './Breadcrumbs.module.scss'
import React from 'react';
import {Link} from 'react-router-dom';
import homeIcon from '../../img/icons/HomeIcon.svg';
import chevronIcon from '../../img/icons/ChevronIcon.svg';

type BreadcrumbsProps = {
  category: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({category}) => {

  const editedCategory = category[0].toUpperCase() + category.slice(1,category.length)

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img
          src={homeIcon}
          alt="home"
          className={styles.homeIcon}
        />
      </Link>

      <span className={styles.chevronSpan}>
        <img
          src= {chevronIcon}
          alt="arrow"
          className={styles.chevronIcon}
        />
      </span>

      <Link
        to={`/${category}`}
        className={styles.label}
      >
        {editedCategory}
      </Link>


      {/* <div>
        <span className={styles.chevronSpan}>
          <img
            src= {chevronIcon}
            alt="arrow"
            className={styles.chevronIcon}
          />
        </span>

        <Link
          to="/"
          className={styles.label}
        >
          Product
        </Link>
      </div> */}



    </nav>
  )
}
