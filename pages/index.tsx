import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from '../styles/Home.module.scss'

import { SearchForm } from "../components/SearchForm";
import { useUserInputKeywordState } from "../infrastructure/recoil/useUserInputKeywordState";
import { useShopDataSWR } from "../infrastructure/hooks/useShopDataSWR";
import { fetcher } from "../libraries/fetcher";

interface Props {
  fallbackData: HotpepperResponseType
};

const Home: React.FC<Props> = ({ fallbackData }) => {
  const userSetKeyword: string = useUserInputKeywordState();
  const { data } = useShopDataSWR(userSetKeyword, fallbackData);

  return (
    <div>
      <Head>
        <title>東京グルメ検索</title>
        <meta name="description" content="ホットペッパーAPIを使用して東京のグルメ検索" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className={styles.headerContenter}>
          <h1 className={styles.title}>東京グルメ検索（ホットペッパーAPI）</h1>
          <SearchForm userSetKeyword={`${userSetKeyword}`} fallbackData={fallbackData} />
        </div>
      </header>

      <main>
        <div className={styles.container}>
          <div className={styles.shopList}>
            {data?.results ? (
                data.results.shop.map((shopData: ShopObj) => {
                  return (
                    <div key={shopData.id} className={styles.shopData}>
                      <p>
                        <span className={styles.shopDataTitle}>掲載店名:</span>
                        <br />
                        {shopData.name}
                      </p>
                      <p>
                        <span className={styles.shopDataTitle}>お店ジャンル:</span>
                        <br />
                        {shopData.genre.name}
                      </p>
                      <p>
                        <span className={styles.shopDataTitle}>最寄駅名:</span>
                        <br />
                        {shopData.station_name}
                      </p>
                      <p>
                        <span className={styles.shopDataTitle}>お店ジャンルキャッチ:</span>
                        <br />
                        {shopData.genre.catch}
                      </p>
                    </div>
                  )
                })
              ): (
                <p>loading.....</p>
              )
            }
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  if (typeof process.env.API_URL_ROOT === "undefined") {
    return {
      props: {
        fallbackData: undefined
      }
    }
  }

  const API_URL = process.env.API_URL_ROOT

  const data = await fetcher(API_URL)
  return {
    props: {
      fallbackData: data
    }
  }
}
