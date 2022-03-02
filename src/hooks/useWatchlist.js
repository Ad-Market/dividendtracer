import React, { useEffect } from "react";
import axios from "axios";
import { useWeb3Wallet } from "./useWeb3Wallet";

export const useWatchlist = (tokenAddress, tokenName, tokenSymbol) => {
    const [watchlist, setWatchlist] = React.useState([]);
    const [isInWatchlist, setIsInWatchlist] = React.useState(false);
    const {account} = useWeb3Wallet();
    
    const addToWatchlistBDD = async() => {
        let data = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/addToWatchlist',
            data: {
                address: account,
                tokenAddress: tokenAddress,
                tokenName: tokenName,
                symbol: tokenSymbol
            }
        })
        .then(res => {
            return res.data;            
        })
        .catch(err => {
            console.log(err);
        })

        setWatchlist(data);
        return data;
    }

    const removeFromWatchlistBDD = async(address) => {
        address = address ? address : tokenAddress;
        let data = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/removeFromWatchlist',
            data: {
                address: account,
                tokenAddress: address
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })

        setWatchlist(data);
        return data;
    }

    const getUserWatchlistBDD = async() => {
        let userWatchlist = await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/getUserWatchlist',
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
        return userWatchlist;
    }

    const addToWatchlistLocal = () => {
        let watchlist = localStorage.getItem('watchlist');
         watchlist = watchlist ? JSON.parse(watchlist) : [];
         if(!(watchlist.some(o => o.address === tokenAddress))){
             let newWatchlist = {address: tokenAddress, name: tokenName, symbol: tokenSymbol};
             watchlist.push(newWatchlist);
             localStorage.setItem('watchlist', JSON.stringify(watchlist));
             setWatchlist(watchlist);
         }
         return;
     }
 
    const removeFromWatchlistLocal = (address) => {
        address = address ? address : tokenAddress;
        let watchlist = localStorage.getItem('watchlist');
        watchlist = watchlist ? JSON.parse(watchlist) : [];
        watchlist = watchlist.filter(item => item.address !== address);         
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        setWatchlist(watchlist);
    }


    const getWatchlistLocal = () => {
        let watchlist = localStorage.getItem('watchlist');
        watchlist = watchlist ? JSON.parse(watchlist) : [];
        return watchlist;
    }

    const addToWatchlist = () => {
        account ? addToWatchlistBDD() : addToWatchlistLocal();
        setIsInWatchlist(true);
    };
    
    const removeFromWatchlist = (tokenAddress) => {        
        account ? removeFromWatchlistBDD(tokenAddress) : removeFromWatchlistLocal(tokenAddress);
        setIsInWatchlist(false);
    };

    const fetchWatchlist = async() => {
        if(account){
            let watchlist = await getUserWatchlistBDD();
            setWatchlist(watchlist);
            return watchlist.some(o => o.address === tokenAddress) ? setIsInWatchlist(true) : setIsInWatchlist(false);
        }else{
            let watchlist = getWatchlistLocal();
            setWatchlist(watchlist);
            return watchlist.some(o => o.address === tokenAddress) ? setIsInWatchlist(true) : setIsInWatchlist(false);
        }
    }

    useEffect(() => {
        fetchWatchlist();
        return () => {
            setIsInWatchlist(false);
            setWatchlist([]);
        }
    }, []);
    
    return {
        watchlist,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist
    };
}