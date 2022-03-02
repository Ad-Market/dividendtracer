import React from 'react';
import { useTrendingCoins } from '../../hooks/useTrendingCoins';
import Marquee from "react-fast-marquee";
import {Flex, Text} from 'rebass';
import { TokenIconWrapper } from '../Token/TokenSymbol';

const ItemMarquee = ({ item, index }) => {

    return(
        <>
            <Flex px={[3, 4]} py={2} alignItems="center" justifyContent="center" sx={{borderRight: 'solid 1px grey'}}>
                <Flex alignItems="center" justifyContent="center" sx={{gap: '16px'}}>
                    <Text color="white" fontSize={4} lineHeight={1} fontWeight={'bold'}>#{index}</Text>
                    <Flex alignItems="center" justifyContent="center" sx={{gap: '12px'}}>
                        <Flex alignItems={'center'} justifyContent={'center'}>
                            <TokenIconWrapper symbol={item.symbol} address={item.tokenAddress} size={'30px'} /> 
                        </Flex>
                        <Flex flexDirection="column">
                            <Text fontSize={[1, 2]} color='white'>{item.name}</Text>
                            <Text fontSize={'10px'} color='white'>${item.symbol}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export const TrendingsMarquee = () => {

    const trendings = useTrendingCoins();

    return (
        trendings && trendings.length > 0 &&
        <Flex alignItems="center" justifyContent="center">
            <Flex alignItems="center" py={2} px={4} sx={{borderRight: 'solid 1px grey'}}>
                <Flex alignItems='center' color="white" fontSize={[1, 2, 3]} fontWeight="bold">🏆 <Text>Trendings</Text></Flex>
            </Flex>
            <Marquee gradient={false} speed={80} pauseOnHover={true}>
                {trendings.map((trending, index) => {
                    return (
                        <ItemMarquee key={index} index={index + 1} item={trending} />
                    )
                })
                }
            </Marquee>
        </Flex>
    )
}