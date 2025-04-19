import Image from "next/image";
import styles from "./page.module.css";
import data from "./data.json";

export default function Home() {
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
    </div>
  );
}
