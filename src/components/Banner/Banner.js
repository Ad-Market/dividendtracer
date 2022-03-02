import React from 'react';
import { Box, Text} from 'rebass';
import { Modal } from '../Modal/Modal';
import { BannerWrapper } from './styled';

export const Banner = () => {

    const [modalOpen, setModalOpen] = React.useState(false);

    return(
        <>
        <BannerWrapper id="releaseNotesBanner" onClick={() => setModalOpen(true)}>
            <Text color="white" fontSize={[1]}>
                🎉 New update available <small>(click to learn more)</small>
            </Text>
        </BannerWrapper>

        <Modal isOpen={modalOpen} title={'🎉 Release notes'} onClose={() => setModalOpen(false)}>
            <Box width={1} textAlign="center">
                <Text pb={[3, 4]} color="white" fontWeight="bold" fontSize={[2, 3, 4]}>
                👨‍🍳  We cooked this for you
                </Text>
            </Box>
            <Box width={'100%'}>
                <Text fontSize={[2, 3]} fontWeight="bold" color="white">Connect Wallet</Text>
                <ul style={{color: 'white'}}>
                    <li>Metamask/TrustWallet browsers and extensions</li>
                    <li>WalletConnect</li>
                    <li>Added search history and watchlist</li>
                </ul>
                <Text fontSize={[2, 3]} fontWeight="bold" color="white">Trending coins</Text>
                <ul style={{color: 'white'}}>
                    <li>Trending coins are back (coming in a few days)</li>
                </ul>
                <Text fontSize={[2, 3]} fontWeight="bold" color="white">Routes</Text>
                <ul style={{color: 'white'}}>
                    <li>New : <code>/results?token=0x...</code></li>
                        <ul>
                            <li>Prompt the user to add a wallet address and displays results for specified token</li>
                        </ul>
                    <li>New : /results?token=0x...&wallet=0x... route</li>
                    <ul>
                        <li>Displays the results for a token and a wallet</li>
                    </ul>
                </ul>
                <Text fontSize={[2, 3]} fontWeight="bold" color="white">Others</Text>  
                <ul style={{color: 'white'}}>                  
                    <li>New layout for results page (Better for screenshots 📸)</li>
                </ul>
            </Box>
        </Modal>
        </>
    )
}