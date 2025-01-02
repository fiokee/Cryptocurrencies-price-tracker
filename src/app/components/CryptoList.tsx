'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
}

const CryptoList = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_COINGECKO_API as string;;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<CoinData[]>(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercent = (percent: number | null) => {
    if (!percent) return 'N/A';
    return `${percent.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue- font-semibold text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left bg-[#FF00FF] text-black font-semibold">Asset</th>
              <th className="p-4 text-right bg-[#FF00FF] text-black font-semibold">Price</th>
              <th className="p-4 text-right bg-[#FF00FF] text-black font-semibold">Market Cap</th>
              <th className="p-4 text-right bg-[#FF00FF] text-black font-semibold">1h</th>
              <th className="p-4 text-right bg-[#FF00FF] text-black font-semibold">24h</th>
              <th className="p-4 text-right bg-[#FF00FF] text-black font-semibold">7D</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin) => (
              <tr key={coin.id} className="border-b hover:bg-[#BA55D3]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-medium">
                  {formatNumber(coin.current_price)}
                </td>
                <td className="p-4 text-right text-gray-600">
                  {formatNumber(coin.market_cap)}
                </td>
                <td className={`p-4 text-right ${
                  coin.price_change_percentage_1h_in_currency > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercent(coin.price_change_percentage_1h_in_currency)}
                </td>
                <td className={`p-4 text-right ${
                  coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercent(coin.price_change_percentage_24h)}
                </td>
                <td className={`p-4 text-right ${
                  coin.price_change_percentage_7d_in_currency > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercent(coin.price_change_percentage_7d_in_currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;