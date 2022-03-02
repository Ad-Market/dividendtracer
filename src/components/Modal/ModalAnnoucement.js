import React, {useState, useEffect} from 'react';
import { Modal } from "../../components/Modal/Modal";
import {Flex, Text} from "rebass";
import { TelegramButton } from "../../components/Header/styled";
import { FaTelegramPlane } from "react-icons/fa";

export const ModalAnnouncement = () => {

    const [isModalOpen, setIsModalopen] = useState(false);
    const modalViewed = React.useMemo(() => {return localStorage.getItem('modalViewed')}, []);

    const closeModal = () => {
        setIsModalopen(false);
        localStorage.setItem('modalViewed', true);
    }

    useEffect(() => {
        setTimeout(() => {
            if(!modalViewed){
                setIsModalopen(true);
                return;
            }
        }, 20000);
    }, [])

    return(
        <Modal noCloseButton={true} isOpen={isModalOpen} title={'📢 If we say Tokenomics...'} onClose={closeModal}>
            <Flex mb={3} flexDirection="column" alignItems="center">
                <Text color="white" mb={2} fontWeight={'bold'} textAlign="center" fontSize={[2, 3]}>🤑 Get a chance to join our presale whitelist</Text>
                <Text color="white" mb={4} textAlign="center" fontStyle="italic" fontSize={1}>Not already a part of the DividendTracer's community ?</Text>
                <TelegramButton noMobile rel="noreferrer" target="_blank" href="https://t.me/DividendTracer">Join our telegram <FaTelegramPlane color="white" /></TelegramButton>
            </Flex>
        </Modal>
    )

}