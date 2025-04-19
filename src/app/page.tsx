'use client';

import Image from "next/image";
import styles from "./page.module.css";
import data from "./data.json";
import {useState} from 'react'

export default function Home() {


  const [activeExpandables, setActiveExpandables] = useState<{years: string[], yearsAndMonths: string[]}>({years: [], yearsAndMonths: []});

  const toggleSection = ( year: string ) => {
    console.log(year);
  
    const tmpArrYears = [...activeExpandables.years];
    tmpArrYears.push(year);
    const tmpExpandables = { years: tmpArrYears, yearsAndMonths: activeExpandables.yearsAndMonths };
    setActiveExpandables(tmpExpandables);
  }

  const isYearActive = (year: string): boolean => {

    return activeExpandables.years.indexOf(year) >= 0;
  }
  
  const isYearAndMonthActive = (year: string, month: string): boolean => {
  
    return false;
  }


  return (
    <div className={styles.main}>
      <Image
        src="/blogger.googleusercontent.com/img/a/AVvXsEiC_fBt1fxP8LCiOseuw0tHa6BMkuvbLKbn-arCBpakjoxX5QuUMxqzVO4UEwHLxqI_XZ2VcHpallG6vXNKoIAGmbG-EZlNM1M6WBWuxp3n6UEO27rmKBCB1QA2DmtC6mJwCOvqH3dJVpiQI93hZ6dA9wI_9-Xefi-Qr7Jxy6UsQYsU3NBETS_-46jy%3ds983.9"
        width={983}
        height={494}
        alt="Rensselaer Adventures"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 494,
          objectFit: 'contain',
        }}
      />
      <div className={styles.description}>
        This blog reports events and interesting tidbits from Rensselaer, Indiana and the surrounding area.
      </div>

      <div className={styles.title}>Archive</div>
      {getYears().map((year: string) => {
        
        return (
          <div>
            <div className={`${styles.year} ${isYearActive(year.year) ? styles.active : ''}`} onClick={() => toggleSection(year.year)} key={year.year}>{year.year}</div>
            {isYearActive(year.year) ?
            <div className={styles.months}></div>
            : null}
            
          </div>
        )
      })}
      
    </div>
  );
}


const getYears = () => {
  return data.reduce((a, {year}) =>
    a.some(ob => ob.year === year) ? a : a.concat({year})
  , []);
}

const getMonthsForYear = (year: string) => {


  const postsForYear = data.filter((post) => post.year === year);

  const monthsForYear = postsForYear.reduce((accumulator, {month}) => {
    return accumulator.some(obj => obj.month === month) ? accumulator : accumulator.concat({month})
  })

  return monthsForYear;
}

