import styles from './styles.module.css'

const Legend = ({labels, colorScale, setContinent, continent}) => {
  return (
    <div className={styles.legendContainer}>
        {labels.map((l) => (
            <div className={styles.legendRow}>
                <div style={{backgroundColor: colorScale(l)}} className={styles.legendMarker} onClick={() => setContinent(l)}></div>
                <p className={styles.legendLabel}>{l}</p>
            </div>
        ))}
    </div>
  )
}

export default Legend