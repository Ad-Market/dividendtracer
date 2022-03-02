import React, { useEffect } from "react";
import { GlobalContext } from "../provider/GlobalProvider";
import { ERC20 } from "../abi/erc20";

export const useTokenInfo = (token) => {
    const context = React.useContext(GlobalContext);
    const [tokenName, setTokenName] = React.useState("");
    const [tokenSymbol, setTokenSymbol] = React.useState("");

    const getTokenName = async() => {
        const tokenContract = await context.global.actions.getFreeContractInstance(token, ERC20)
        const tokenName = await context.global.actions.callContractMethod(tokenContract, "name");
        return tokenName
    }

    const getTokenSymbol = async () => {
        const tokenContract = await context.global.actions.getFreeContractInstance(token, ERC20)
        const tokenSymbol = await context.global.actions.callContractMethod(tokenContract, "symbol");
        return tokenSymbol
    }

    const getCoin = async() => {
        let symbol = await getTokenSymbol();
        symbol = symbol.toLowerCase();
        let result = await fetch(window.location.origin+'/coins/'+symbol+'.png', { method: 'HEAD' })
        result = result.ok && result.headers.get("content-type").includes('image') ? result.url : false; 
        return result;
    }

    const fetchData = async() => {
        setTokenName(await getTokenName());
        setTokenSymbol(await getTokenSymbol());
    }

    useEffect(() => {
        fetchData();
        return () => {
            setTokenName("");
            setTokenSymbol("");
        }
    }, [token])    

    return {tokenName, tokenSymbol, getCoin} 

}