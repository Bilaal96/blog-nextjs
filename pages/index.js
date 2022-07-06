// components
import Head from 'next/head';
import Image from 'next/image';
// -- custom
import ImageSlider from '../components/ImageSlider/ImageSlider';
import ImageReel from '../components/ImageReel/ImageReel';

// styles
import styles from '../styles/pages/Home.module.scss';

// constants
import { homeSlides, partnerLogos } from '../constants';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | FreeRoam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.home}>
        <section>
          <ImageSlider
            slides={homeSlides}
            width={1000}
            height={600}
            withTextOverlay
          />
        </section>

        {/* Sales Pitch - credibility, reputation & trust */}
        <section className={styles['sales-pitch']}>
          <h2>
            <div className={styles['left-indent']}>Make Travel Simple.</div>
            <div className={styles['right-indent']}>
              Choose <span className={styles.free}>Free</span>
              <span className={styles.roam}>Roam</span>.
            </div>
          </h2>

          <div className={styles['credibility']}>
            {/* TrustPilot 5 ⭐ rating */}
            <div className={styles['trust-pilot']}>
              <Image src="/rep_trust-pilot.png" layout="fill" />
            </div>

            <div className={styles['trust-builder']}>
              <p>
                As a FreeRoam customer, <strong>you</strong> are our top
                priority. We house experts in world travel so you can expect
                nothing short of excellent, tailored customer service. Map out
                your dream holiday with us today.
              </p>
            </div>

            {/* Tripadvisor award */}
            <div className={styles['trip-advisor']}>
              <Image
                src="/rep_tripadvisor-travellers-choice-2022.png"
                layout="fill"
              />
            </div>

            {/* Travel Weekly nomination */}
            <div className={styles['travel-weekly']}>
              <Image
                src="/rep_travel-weekly-globe-nominee-2022.jpg"
                layout="fill"
              />
            </div>
          </div>
        </section>

        {/* Our Partners - autoplay infinity scroll */}
        <section>
          <ImageReel title="Our Partners" images={partnerLogos} />
        </section>
      </main>
    </>
  );
}
