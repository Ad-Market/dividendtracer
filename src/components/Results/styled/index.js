import React, {useContext, useEffect} from 'react';
import {Flex, Text} from 'rebass';
import {useHistory} from 'react-router-dom';
import { TokenSymbolWrapper } from '../../Token/TokenSymbol';
import { Card } from '../../Card';
import { useTokenInfo } from '../../../hooks/useTokenInfo';
import { GlobalContext } from '../../../provider/GlobalProvider';
import { useSearchHistory } from '../../../hooks/useSearchHistory';
import {FaArrowLeft} from 'react-icons/fa';

export const TokenCard = ({ token }) => {

    let {tokenName, tokenSymbol} = useTokenInfo(token);
    const context = useContext(GlobalContext);
    const history = useHistory();
    const {addToSearchHistory} = useSearchHistory();

    useEffect(() => {
        if(tokenName && tokenSymbol){
            context.global.actions.pushInDatabase(token, tokenName, tokenSymbol);
            addToSearchHistory(token, tokenName, tokenSymbol);
        }
    }, [tokenName, tokenSymbol]);

    return(
        <Card>
            <Flex width={'100%'} alignItems="center" sx={{gap: '22px'}}>
                <FaArrowLeft onClick={() => history.push('/')} style={{cursor:"pointer"}} color="white" size={25} />
                <TokenSymbolWrapper token={token} />
            </Flex>
        </Card>
    )
}

export const GainsGard = ({ globalGain, todayGain, transactions }) => {
    return(
        <Card mt={3}>
            <Flex flex={1} justifyContent="space-around" alignItems="center" flexDirection="row" sx={{"@media screen and (max-width: 330px)": {flexDirection: "column", gap: '30px'}}}>
                <Flex flexDirection="column" alignItems="center">
                    <Text color="white" fontSize={[2, 3, 4]} fontFamily={'ABeeZee'}>{globalGain} $</Text>
                    <Text color="#B1B5C4" fontSize={['13px', 3]} fontFamily={'DM Sans'}>Total profit</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                    <Text color="white" fontSize={[2, 3, 4]}  fontFamily={'ABeeZee'}>{todayGain} $</Text>
                    <Text color="#B1B5C4" fontSize={['13px', 3]} fontFamily={'DM Sans'}>Today</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                    <Text color="white" fontSize={[2, 3, 4]}  fontFamily={'ABeeZee'}>{transactions}</Text>
                    <Text color="#B1B5C4" fontSize={['13px', 3]} fontFamily={'DM Sans'}>Transactions</Text>                   
                </Flex>
            </Flex>
        </Card>
    )
}