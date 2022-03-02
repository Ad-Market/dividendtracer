import React, { useEffect, useRef } from "react";
import { AccountAddress, AccountIcon, AccountWrapper, ConnectorButton, Menu, MenuWrapper, SubMenuWrapper, WalletButton } from "./styled";
import {Flex, Text, Button, Box} from "rebass";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { formatAddress } from "../../utils/format";
import { useWeb3Network } from "../../hooks/useWeb3Network";
import {useWeb3Wallet} from "../../hooks/useWeb3Wallet";
import {toast} from "react-toastify";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import {HiDocumentDuplicate} from "react-icons/hi";
import MetamaskIcon from "../../assets/images/metamask.png";
import WalletConnectIcon from "../../assets/images/walletconnect-logo.png";
import { useIsMobile } from "../../hooks/useIsMobile";

export const WalletButtonWrapper = () => {
    const {ethereum} = window;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const buttonRef = React.createRef();
    const {connect} = useWeb3Wallet();
    const { networkError, switchChainToBsc } = useWeb3Network();
    const wrapperRef = useRef(null);
    const {clicked} = useOutsideAlerter(wrapperRef);

    const handleMetamaskClick = () => {
        if(ethereum) {
            connect('injected');
        }else{
            window.open("https://metamask.io/download.html", "_blank");
        }
    };

    useEffect(() => {
        if(clicked) {
            setIsModalOpen(false);
        }
    }, [clicked]);

    return(
        <SubMenuWrapper active={isModalOpen}>
            <WalletButton ref={buttonRef} error={networkError} onClick={() => !networkError ? setIsModalOpen(true) : switchChainToBsc()}>
                {networkError ? 'Switch to BSC' : 'Connect Wallet'}
            </WalletButton>

            {isModalOpen && 
                <MenuWrapper ref={wrapperRef}>
                    <Menu>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Text mb={3} fontSize={1}>Connect a wallet</Text>
                        </Flex>
                        <Box>
                            <Flex sx={{gap: '15px'}} flexDirection="column">
                                <ConnectorButton backgroundColor="#121212" onClick={() => handleMetamaskClick()}>
                                    <img alt="" src={MetamaskIcon} />
                                    <Flex flex={1} justifyContent="center" alignItems="center">
                                    {!ethereum ? 'Install' : ''} Metamask
                                    </Flex>
                                </ConnectorButton>
                                <ConnectorButton backgroundColor="#121212" onClick={() => connect('walletconnect')}>
                                <img alt="" src={WalletConnectIcon} /> 
                                    <Flex flex={1} justifyContent="center" alignItems="center">
                                        WalletConnect
                                    </Flex>
                                </ConnectorButton>
                            </Flex>
                        </Box>
                    </Menu>
                </MenuWrapper>
                }

        </SubMenuWrapper>
    )
}


export const WalletWrapper = () => {
    
    const {networkError} = useWeb3Network();
    const {account, active, disconnect} = useWeb3Wallet();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const toastId = React.useRef(null);
    const wrapperRef = React.useRef(null);
    const {clicked} = useOutsideAlerter(wrapperRef);

    const copyClipboard = () => {
        navigator.clipboard.writeText(account);
        if(!toast.isActive(toastId.current)) toastId.current = toast.success('Address copied to clipboard', {theme: 'dark', position: 'bottom-center'});
    }

    useEffect(() => {
        if(!active) {
            setIsMenuOpen(false);
        }
    }, [active]);

    useEffect(() => {
        if(clicked){
            setIsMenuOpen(false);
        }
    }, [clicked])

    useEffect(() => {
        if(networkError) {
            if(!toast.isActive(toastId.current)) toastId.current = toast.error('Please switch your network to BSC', {theme: 'dark', icon: '🤯'});
        }else{
            toast.dismiss();
        }
    }, [networkError]);

    return(
        <>
            {!account || networkError ?
                <WalletButtonWrapper />
            :
            <SubMenuWrapper active={isMenuOpen}>
                <AccountWrapper onClick={(e) => setIsMenuOpen(!isMenuOpen)}>
                    <AccountAddress>{formatAddress(account)}</AccountAddress>
                    <AccountIcon>
                        <Jazzicon
                            diameter={20}
                            seed={jsNumberForAddress(account)}
                        />
                    </AccountIcon>
                </AccountWrapper>
                {isMenuOpen && 
                    <MenuWrapper ref={wrapperRef}>
                        <Menu>
                            <Flex alignItems="center" justifyContent="space-between">
                                <Text fontSize={[1, 2]}>Account</Text>
                            </Flex>
                            <Flex pt={2} width='fit-content' justifyContent="space-between" alignItems="center">
                                <Jazzicon
                                    diameter={20}
                                    seed={jsNumberForAddress(account)}
                                />
                                <Flex onClick={() => copyClipboard()} alignItems="center" sx={{':hover': {cursor: 'pointer', opacity: 0.5}}}>
                                    <Text p={0} px={2} fontSize={[2, 3]}>{formatAddress(account, useIsMobile ? 7 : 12)}</Text>
                                    <HiDocumentDuplicate size={20} />   
                                </Flex>                             
                            </Flex>
                            <Button onClick={() => disconnect()} px={2} mt={4} backgroundColor="#ff2121" color="white" sx={{'&:hover': {cursor: 'pointer', opacity: 0.5}}}>Disconnect</Button>
                        </Menu>
                    </MenuWrapper>
                }
            </SubMenuWrapper>
            }
        </>
    )
}