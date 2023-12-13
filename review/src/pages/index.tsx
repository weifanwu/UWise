import React from 'react';
import styles from './index.css';
import SearchBar from '../components/searchBar';
import Recommandation from '@/components/recommandation'

/**
 * 主页面page
 * @param props
 */
function homePage(props: any) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.logo}>
        <p style={{ margin: 0, color: 'white', fontSize: '38pt' }}>
          Course Rating
        </p>
      </div>
      <div className={styles.barWrapper}>
        <SearchBar width="100%" />
      </div>
      <div className={styles.recommandation}>
        <Recommandation />
      </div>
    </div>
  );
}

export default homePage;
