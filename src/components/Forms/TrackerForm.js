import React, { useEffect } from 'react';
import { Heading, Box } from 'rebass';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { useWeb3Network } from '../../hooks/useWeb3Network';
import { useWeb3Wallet } from '../../hooks/useWeb3Wallet';
import { FormWrapper, ItemForm, ErrorMessage, Input, SubmitButton, SearchHistoryWrapper, SearchHistory } from './styled';


export const Form = ({action, handleAddress, handleWallet, errorWallet, errorToken}) => {

    return(
        <FormWrapper  action="">
            <Heading mb={3} fontFamily="DM Sans" color="white" fontSize={[3, 4]} mt={0} textAlign="center">Start tracking your dividends</Heading>
            <InputTracker handleAddress={handleAddress} errorToken={errorToken} />
            <InputWallet handleWallet={handleWallet} errorWallet={errorWallet} />
            <SubmitButton id="searchDividendBtn" onClick={(e) => action(e)} type="submit">Track your dividend</SubmitButton>
        </FormWrapper>
    )
}

const InputTracker = ({handleAddress, errorToken}) => {

    const inputRef = React.createRef();
    const wrapperRef = React.useRef(null);
    const [showSearchhistory, setShowSearchhistory] = React.useState(false);
    const [selectedToken, setSelectedToken] = React.useState('');
    const {clicked} = useOutsideAlerter(wrapperRef);

    const handleClick = (token) => {
        setShowSearchhistory(false);
        setSelectedToken(token);
    }

    const handleInput = (value) => {
        if(value === ''){
            setShowSearchhistory(true);
        }else{
            setShowSearchhistory(false);
            handleAddress(value)
        }
    }

    useEffect(() => {
        if(selectedToken) {
            inputRef.current.value = selectedToken;
            handleAddress(selectedToken)        
        }
    }, [selectedToken])

    useEffect(() => {
        if(clicked) {
            setShowSearchhistory(false);
        }
    }, [clicked])


    
    return(
        <ItemForm>
            <label htmlFor="item">Token address</label>
            <SearchHistoryWrapper ref={wrapperRef}>
                <Input ref={inputRef} autoComplete="off" onFocus={() => setShowSearchhistory(true)} className={errorToken ? 'error' : ''} onChange={(e) => handleInput(e.target.value)} type="text" name="token" placeholder="0x..." required />
                <SearchHistory handleClick={handleClick} isOpen={showSearchhistory} />
            </SearchHistoryWrapper>
            <ErrorMessage>{errorToken ? 'Please check token address' : ''}</ErrorMessage>
        </ItemForm>
    )
}

export const InputWallet = ({handleWallet, errorWallet}) => {
    
    const {account} = useWeb3Wallet();
    const {networkError} = useWeb3Network();

    const walletInputRef = React.createRef();

    const [wallet, setWalletState] = React.useState('');
    
    const setWallet = () => {
        setWalletState(account);
        handleWallet(account);
        walletInputRef.current.value = account;
        walletInputRef.current.disabled = true;
    }

    const resetWallet = () => {
        setWalletState('');
        handleWallet('');
        walletInputRef.current.value = "";
        walletInputRef.current.disabled = false;
    }

    const changeWallet = () => {
        if (wallet === '') {
            setWallet();
        } else {
            resetWallet();
        }
    }

    useEffect(() => {
        if(account && !networkError) {
            setWallet();
        }else{
            resetWallet();
        }
    }, [account, networkError])
    

    return(
        <ItemForm>
            <label htmlFor="item">Wallet address</label>
            <Input className={errorWallet ? 'error' : ''} ref={walletInputRef}  onChange={(e) => handleWallet(e.target.value)} type="text" name="wallet" placeholder="0x..." required />
            {errorWallet ? <ErrorMessage>Please check your wallet address</ErrorMessage> : null}
            <Box>
                {account ? <Box sx={{'&:hover':{opacity: 0.5, cursor: 'pointer'}}} display="inline-block" fontFamily="DM Sans" fontSize={[1]} color="white" onClick={() => changeWallet()} mt={2}>{wallet !== '' ? 'Use another wallet' : 'Use your wallet'}</Box> : null}
            </Box>
        </ItemForm>
    )
}