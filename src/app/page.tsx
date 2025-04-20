'use client';

// @ts-nocheck
import Image from "next/image";
import styles from "./page.module.css";
import data from "./data.json";
import {useState} from 'react'

export default function Home() {


  const [activeExpandables, setActiveExpandables] = useState<{years: string[], yearsAndMonths: string[]}>({years: [], yearsAndMonths: []});

  const toggleSection = ( year: string ) => {    
    if ( !isYearActive(year) ) {
      const tmpArrYears = [...activeExpandables.years];
      tmpArrYears.push(year);
      const tmpExpandables = { years: tmpArrYears, yearsAndMonths: activeExpandables.yearsAndMonths };
      setActiveExpandables(tmpExpandables);
    } else {
      let tmpArrYears = [...activeExpandables.years];
      tmpArrYears = tmpArrYears.filter((tmpYear) => tmpYear !== year);
      const tmpExpandables = { years: tmpArrYears, yearsAndMonths: activeExpandables.yearsAndMonths };
      setActiveExpandables(tmpExpandables);
    } 
  }

  const toggleMonthSection = (year: string, month: string) => {

    console.log(year, month)
    console.log(year+month)
    if ( !isYearAndMonthActive(year, month) ) {
      const tmpArrYearsAndMonths = [...activeExpandables.yearsAndMonths];
      tmpArrYearsAndMonths.push(year+month);
      const tmpExpandables = { years: activeExpandables.years, yearsAndMonths: tmpArrYearsAndMonths };
      setActiveExpandables(tmpExpandables);
    } else {
      let tmpArrYearsAndMonths = [...activeExpandables.yearsAndMonths];
      tmpArrYearsAndMonths = tmpArrYearsAndMonths.filter((tmpYear) => tmpYear !== year+month);
      const tmpExpandables = { years: activeExpandables.years, yearsAndMonths: tmpArrYearsAndMonths };
      setActiveExpandables(tmpExpandables);
    } 
  }

  const isYearActive = (year: string): boolean => {
    return activeExpandables.years.indexOf(year) >= 0;
  }
  
  const isYearAndMonthActive = (year: string, month: string): boolean => {

    console.log('isYearAndMonthActive', activeExpandables.yearsAndMonths);

    return activeExpandables.yearsAndMonths.indexOf(year+month) >= 0;
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
          <div key={year.year}>
            <div className={`${styles.year} ${isYearActive(year.year) ? styles.active : ''}`} onClick={() => toggleSection(year.year)}>{year.year}</div>
            {isYearActive(year.year) ?
            <div className={styles.months}>
              {
              getMonthsForYear(year.year).map((month: string) => {

                return (
                  <>
                  <div className={`${styles.month} ${isYearAndMonthActive(year.year, month.month) ? styles.active : ''}`} 
                       onClick={() => toggleMonthSection(year.year, month.month)}
                       key={year.year + month.month}
                  >
                    {`${translateMonthNumberToString(month.month)} ${year.year}`}
                  </div>
                  
                  { isYearAndMonthActive(year.year, month.month) ? (
                    <div className={styles.posts}>
                      {getPostsForYearAndMonth(year.year, month.month).map( (post) => {
                        return (
                          <a href={post.filepath} className={styles.postlink}>
                            <span className={styles.postdate}>{post.date}</span>{post.title}
                          </a>
                        )
                      })}
                    </div>
                  ) : null
                  }
                
                 </> 
                )
              })
              }
            </div>
            : null}
            
          </div>
        )
      })}
      
    </div>
  );
}


const getYears = () => {
  return data.reduce((a, {year} : { year: string }) =>
    a.some((ob: {year: string}) => ob.year === year) ? a : a.concat({year})
  , []);
}

const getMonthsForYear = (year: string) => {


  const postsForYear = data.filter((post) => post.year === year);

  const monthsForYear = postsForYear.reduce((accumulator, {month}) => {
    return accumulator.some((obj: {month: string}) => obj.month === month) ? accumulator : accumulator.concat({month})
  }, [])


  monthsForYear.sort((a, b) => (a.month > b.month));

  return monthsForYear;
}

const translateMonthNumberToString = (month: string) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthInt = Number.parseInt(month);

  return months[monthInt-1];
}


const getPostsForYearAndMonth = (year: string, month: string) => {


  const postsForYearAndMonth = data.filter((post) => post.year === year && post.month === month);

  postsForYearAndMonth.sort((a, b) => {

    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate > bDate;
  })


  return postsForYearAndMonth ?? [];
}