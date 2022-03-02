import React, { useEffect } from "react";
import {ReactComponent as Logo} from "../../assets/images/bills.svg";
import {ReactComponent as Dots} from "../../assets/images/dots.svg";
import {ReactComponent as Docs} from "../../assets/images/docs.svg";
import {ReactComponent as Ask} from "../../assets/images/ask.svg";
import {ReactComponent as Coffee} from "../../assets/images/coffee.svg";
import {HeaderWrapper, LogoWrapper, ActionsWrapper, OptionsWrapper, OptionsButton, OptionsMenuWrapper, OptionsMenu} from "./styled";
import { ModalContact} from "../Modal/Modal";
import {FaRocket, FaTelegramPlane} from 'react-icons/fa';
import {Link, Flex} from "rebass";
import { TelegramButton } from "./styled";
import { WalletWrapper } from "./Wallet";
import {useHistory} from 'react-router-dom';
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";


const Header = () => {
    const history = useHistory();
    const wrapperRef = React.createRef();
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');
    const {clicked} = useOutsideAlerter(wrapperRef);

    useEffect(() => {
        if(clicked){
            setIsOptionsOpen(false);
        }
    }, [clicked])


    return (
        <>
        <HeaderWrapper justifyContent="space-between" alignItems="center">
            <LogoWrapper onClick={() => history.push('/')}>
                <Logo />
                <h1>Dividend Tracer</h1>
            </LogoWrapper>
            <ActionsWrapper>
                {/* <Flex sx={{'@media screen and (max-width: 997px)': {display: 'none'}}} alignItems="center" color="white">
                    <TelegramButton id="telegramHeader" rel="noreferrer" target="_blank" href="https://token.dividendtracer.com">Token is coming <FaRocket color="white" /></TelegramButton>
                </Flex> */}
                <WalletWrapper />
                <OptionsWrapper active={isOptionsOpen}>
                    <OptionsButton onClick={() => setIsOptionsOpen(!isOptionsOpen)} id="openMenuTop">
                        <Dots />
                    </OptionsButton>
                        {isOptionsOpen &&
                            <OptionsMenuWrapper ref={wrapperRef}>
                                <OptionsMenu>
                                    <Link display={'flex'} alignItems='center' justifyContent="space-between" color="#a0a0a1" fontSize={[2]} sx={{gap: '10px', textDecoration: "none", "svg":{opacity: 0.6}}} id="telegramMenu" rel="noreferrer" target="_blank" href="https://t.me/DividendTracer">Join our telegram <FaTelegramPlane /></Link>
                                    <Link display={'flex'} mt={2} alignItems='center' justifyContent="space-between" color="#a0a0a1" fontSize={[2]} sx={{gap: '10px'}} onClick={() => {setIsOptionsOpen(false); setIsModalOpen(true); setModalTitle('Contact us')}}>Contact us <Ask /></Link>
                                    <Link display={'flex'} mt={2} alignItems='center' justifyContent="space-between" color="#a0a0a1" fontSize={[2]} sx={{gap: '10px'}} id="requestFeatures" onClick={() => {setIsOptionsOpen(false);setIsModalOpen(true); setModalTitle('Request features')}}>Request features <Coffee /></Link>
                                    <Link display={'flex'} mt={2} mb={2} alignItems='center' justifyContent="space-between" color="#a0a0a1" fontSize={[2]} sx={{gap: '10px'}} id="legalsMenu">Legal & privacy <Docs /></Link>
                                </OptionsMenu>
                            </OptionsMenuWrapper>
                        }
                </OptionsWrapper>
            </ActionsWrapper>
        </HeaderWrapper>
        <ModalContact isOpen={isModalOpen} title={modalTitle} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default Header;