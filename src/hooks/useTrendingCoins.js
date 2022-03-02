import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useTrendingCoins = () => {
    
    const [trendingCoins, setTrendingCoins] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: 'GET',
                url: 'https://dividendtracer.com:3001/v1/coin/trendingCoins',
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
            return setTrendingCoins(response);
        };
        fetchData();

        return () => {
            setTrendingCoins([]);
        }

    }, []);
    
    return trendingCoins
}
