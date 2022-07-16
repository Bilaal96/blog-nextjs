import sampleSize from 'lodash/sampleSize';

// components
import Head from 'next/head';
import Link from 'next/link';
// -- custom
import HeroImage from '../../components/HeroImage/HeroImage';
import DecoratedHeading from '../../components/DecoratedHeading/DecoratedHeading';
import ArticlePreviewList from '../../components/ArticlePreviewList/ArticlePreviewList';
import NoData from '../../components/NoData/NoData';

// styles
import styles from '../../styles/pages/Blog.module.scss';

// constants
import { STRAPI_URL } from '../../constants';
import { GET_ARTICLES_BY_NEWEST_FIRST } from '../../graphql/queries';

export default function Blog({ latestArticles, otherArticles }) {
  return (
    <>
      <Head>
        <title>Blog | FreeRoam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroImage
        title="Blog"
        src="/blog-header.jpg"
        alt="Books & sunglasses on table at the beach"
      />

      <main className={styles.blog}>
        {/* 3 Latest Articles */}
        <section className={styles['latest-articles']}>
          <DecoratedHeading level="2" text={'Latest Articles'} />

          {latestArticles?.length > 0 ? (
            <div className={styles['articles-list']}>
              <ArticlePreviewList articles={latestArticles} />
            </div>
          ) : (
            <NoData
              message={'There are currently no articles to read 😢'}
              messageEmphasised={
                '💡 Sign up to our <span>newsletter</span> using the form below to hear from us as soon as we post! 😁'
              }
            />
          )}

          {/* Link to view all articles */}
          <Link href="/blog/all-articles">
            <a className={styles['view-all-btn']}>View all </a>
          </Link>
        </section>

        {/* Random selection of articles */}
        {otherArticles?.length > 0 && (
          <section className={styles['other-articles']}>
            <DecoratedHeading level="2" text="Other Articles" />

            <div className={styles['articles-list']}>
              <ArticlePreviewList articles={otherArticles} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Fetch all articles, sorted by creation date in descending order
  // i.e. with the newest article appearing first in the array; and the oldest appearing last
  const fetchOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_ARTICLES_BY_NEWEST_FIRST,
    }),
  };
  const response = await fetch(`${STRAPI_URL}/graphql`, fetchOptions);
  const result = await response.json();

  /**
   * strapi returns object (result) with a data property
   * data property -> contains all requested data (e.g. all entries in a single collection-type)
   
   * NOTE: strapi response object has specific structure
   * --- Array of entries ---
   * result.data.articles is an object
   * result.data.articles.data is an array of articles
   * --- Single entry from an array of entries ---
   * result.data.articles.data[0].id
   * result.data.articles.data[0].attributes.title
   * result.data.articles.data[0].attributes.content
   
   * --- Props Passed to Home Page ---
   * Articles is an array of objects (each representing an article)
   * Each article has 'id' and 'attributes' property
   * Properties/fields of articles (defined in Strapi) are found under 'attributes' object
   */
  const { articles } = result.data;

  // Extract the 3 latest articles into a new array
  const latestArticles = articles.data.splice(0, 3);

  // Get otherArticles - i.e. a selection of random articles
  // NOTE: as splice() is used (above), latestArticles are excluded from the selection for otherArticles
  const articlesCount = 7; // num of articles to select
  const otherArticles = sampleSize(articles.data, articlesCount);

  return {
    props: {
      latestArticles, // array of the 3 latest articles
      otherArticles, // selection of random articles
    },
    revalidate: 10,
  };
}
