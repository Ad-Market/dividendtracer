import React, {useEffect} from 'react';
import { AddressLink, TokenIcon, TokenName } from './styled';
import {Flex, Text, Box} from "rebass";
import {FaRegStar, FaStar} from 'react-icons/fa';
import { useIsMobile, useIsSmall } from '../../hooks/useIsMobile';
import { formatAddress } from '../../utils/format';
import {ReactComponent as Bscscan} from "../../assets/images/bscscan.svg";
import ReactTooltip from 'react-tooltip';
import { CustomBlockies } from '../Header/styled/blockies';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useTokenInfo } from '../../hooks/useTokenInfo';
import { CustomLoader } from '../Loader/Loader';

export const TokenIconWrapper = ({address, size}) => {

    const [icon, setIcon] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const {getCoin} = useTokenInfo(address);
    const isMobile = useIsMobile();

    async function init() {
        const coin = await getCoin();
        setIcon(coin);
        setLoading(false);
    }

    useEffect(() => {
        init();
    }, []);


    return(
        !loading ?
            icon ?
                <TokenIcon className="token-symbol" size={size || null} src={icon} />
            :
                <Flex width="auto" height="auto" alignItems="center" justifyContent="center" sx={{'canvas': {borderRadius: '100%', width: size ? size+' !important' : '100% !important', height: size ? size+' !important' : '100% !important'}}}>
                    <CustomBlockies seed={address} scale={isMobile ? 4 : 6} />
                </Flex>
        :
        <Flex width="auto">
            <CustomLoader size={size || 40} />
        </Flex>
    )

}


export const TokenSymbolWrapper = ({ token }) => {

    const isMobile = useIsMobile();
    const isSmall = useIsSmall();
    const {tokenName, tokenSymbol} = useTokenInfo(token);
    const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useWatchlist(token, tokenName, tokenSymbol);

    const saveWatchlist = async() => {
        if(!isInWatchlist){
            addToWatchlist()
        }else{
           removeFromWatchlist()
        }
    }

    return (
        <Flex alignItems="center" justifyContent={'space-between'} width='100%' sx={{gap: '15px'}}>
            <Flex sx={{gap: '15px'}}>
                {!isSmall && <TokenIconWrapper address={token} symbol={tokenSymbol} />}
                <TokenName>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text color="white" fontSize={[2, 3, 4]} fontWeight='bold' fontFamily={'ABeeZee'}>{tokenName}</Text>
                    </Flex>
                    <AddressLink>{isMobile ? formatAddress(token, 8) : token}</AddressLink>
                </TokenName>
            </Flex>
            <Flex alignItems="center" sx={{gap: '15px'}}>
                <Box sx={{'&:hover':{opacity: 0.8, cursor: 'pointer'}}}>
                    <a data-tip="Bscscan" href={'https://bscscan.com/address/'+token} target="_blank" rel="noopener noreferrer">   
                        <Bscscan  fill='#B1B5C4' width={isMobile ? 18 : 26} height={isMobile ? 18 : 26} />
                    </a>
                    <ReactTooltip />
                </Box>
                <Box sx={{'&:hover':{opacity: 0.8, cursor: 'pointer'}}} onClick={saveWatchlist}>        
                    {isInWatchlist ? <FaStar data-tip="Remove from watchlist" color="#B1B5C4" size={isMobile ? 18 : 26} /> : <FaRegStar data-tip="Add to watchlist" color="#B1B5C4" size={isMobile ? 18 : 26} />}
                    <ReactTooltip />
                </Box>
            </Flex>
        </Flex>
    )
}