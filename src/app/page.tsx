import React from "react";
import Head from "next/head";
import CryptoList from "./components/CryptoList";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cryptocurrencies - Price Tracker</title>
        <meta name="description" content="View live cryptocurrency prices tracker and updates." />
      </Head>
      <div>
        <h1 className="text-center font-bold m-5 uppercase">Cryptocurrencies - Price</h1>
        <CryptoList />
      </div>
    </>
  );
}
