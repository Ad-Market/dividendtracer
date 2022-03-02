import React, { useEffect } from "react";
import axios from "axios";
import { useWeb3Wallet } from "./useWeb3Wallet";

export const useSearchHistory = () => {

    const [searchHistory, setSearchHistory] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
    const {account} = useWeb3Wallet();

    const getSearchHistoryBDD = async() => {
        let data = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/getUserSearchHistory',
            data: {
                address: account
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log('user not found');
        })
        setSearchHistory(data);
        return data;
    }

    const addToSearchHistoryBDD = async(tokenAddress, tokenName, symbol) => {
        addToLocalSearchHistory(tokenAddress, tokenName, symbol);
        let data = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/addToSearchHistory',
            data: {
                address: account,
                tokenAddress: tokenAddress,
                tokenName: tokenName,
                symbol: symbol
            }
        })
        .then(res => {
            return res.data;           
        })
        .catch(err => {
            console.log(err);
        });
        setSearchHistory(data);
        return data;
    }

    const removeFromSearchHistoryBDD = async(tokenAddress) => {
        removeFromLocalSearchHistory(tokenAddress);
        let data = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/removeFromSearchHistory',
            data: {
                address: account,
                tokenAddress: tokenAddress
            }
        })
        .then(res => {
           return res.data;
        })
        .catch(err => {
            console.log(err);
        });
        console.log(data);
        setSearchHistory(data);
        return data;
    }


    const addToLocalSearchHistory = (tokenAddress, tokenName, symbol) => {
        let searchHistory = localStorage.getItem('searchHistory');
        searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
        if(!(searchHistory.some(o => o.address.toLowerCase() === tokenAddress.toLowerCase()))){
            let newSearchHistory = {address: tokenAddress, name: tokenName, symbol: symbol};
            searchHistory.push(newSearchHistory);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            setSearchHistory(searchHistory);
        }
    }

    const removeFromLocalSearchHistory = (tokenAddress) => {
        let searchHistory = localStorage.getItem('searchHistory');
        searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
        searchHistory = searchHistory.filter(item => item.address !== tokenAddress);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        setSearchHistory(searchHistory);
    }

    const getLocalSearchHistory = async() => {
        let searchHistory = localStorage.getItem('searchHistory');
        searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
        searchHistory = searchHistory.reverse();
        setSearchHistory(searchHistory);
        return searchHistory;
    }

    const addToSearchHistory = async(tokenAddress, tokenName, symbol) => {
        account ? addToSearchHistoryBDD(tokenAddress, tokenName, symbol) : addToLocalSearchHistory(tokenAddress, tokenName, symbol);
    }

    const removeFromSearchHistory = async(tokenAddress) => {
        account ? removeFromSearchHistoryBDD(tokenAddress) : removeFromLocalSearchHistory(tokenAddress);
    }

    useEffect(() => {
        account ? getSearchHistoryBDD().finally(() => {setFetched(true)}) : getLocalSearchHistory().finally(() => setFetched(true));
    
        return () => {
            setFetched(false);
            setSearchHistory([]);
        }

    }, [account])
    
    return {
        searchHistory,
        fetched,
        addToSearchHistory,
        removeFromSearchHistory,
    };
}