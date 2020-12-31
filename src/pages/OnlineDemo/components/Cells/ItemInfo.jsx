import React from 'react'
import styles from './index.module.scss'

const ItemInfo = ({ item }) => (
  <div className={styles.ItemInfo}>
    <img src={item.img} alt="product img" />
    <div className={styles.ItemInfo_Info}>
      <p className={styles.ItemInfo_Title} title={item.title}>{ item.title || '暂无' }</p>
      <p className={styles.ItemInfo_UPC}>
        <span>UPC码:</span>
        <span>{ item.upc || '--' }</span>
      </p>
    </div>
  </div>
)
export default ItemInfo