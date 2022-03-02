import React from  'react';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

export const useWeb3Network = () => {
    const { ethereum } = window;
    const {active, account, library, connector} = useWeb3React();
    const [networkError, setNetworkError] = useState(false);

    useEffect(() => {
        checkChainId();
        return () => null
    }, [active, account, library, connector]);

    const checkChainId = async() => {
        if(connector && active){ 
            let chainId = await connector.getChainId();
            if(chainId !== '0x38' && chainId !== 56)  setNetworkError(true)
            else setNetworkError(false);
        }else{
            setNetworkError(false);
        }
    }

    const switchChainToBsc = async () => {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x38' }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0x38', rpcUrl: 'https://bsc-dataseed.binance.org/' }],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    }

    return {
        networkError,
        switchChainToBsc,
    }


}
