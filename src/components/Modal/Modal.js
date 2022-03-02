import React, { useEffect } from "react";
import { ModalHeaderWrapper, ModalInner, ModalWrapper } from "./styled";
import { FormWrapper, Input, ItemForm, SubmitButton, Textarea } from "../Forms/styled";
import {Heading, Text, Flex, Button} from "rebass";
import emailjs from 'emailjs-com';
import { CustomLoader } from "../Loader/Loader";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";


const ModalHeader = ({title, close}) => {

    return (
        <ModalHeaderWrapper>
                <>
                    <Text color="white" fontFamily="DM Sans" fontSize={[[1, 2]]}>{title}</Text>
                    <button onClick={(e) => close(e)} type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </>
        </ModalHeaderWrapper>
    );
};


export const ModalContact = ({isOpen, onClose, title}) => {

    const form = React.useRef();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [mailSent, setMailSent] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [errorName, setErrorName] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorSubject, setErrorSubject] = React.useState(false);
    const [sent, setSent] = React.useState(false);

    const checkForm = () => {
        if (name !== '' && email !== '' && message !== '' && subject !== '') {
            return true;
        }
        if(name === '') {
            setErrorName(true);
        }
        if(email === ''){
            setErrorEmail(true)
        }
        if(message === ''){
            setErrorMessage(true)
        }
        if(subject ===''){
            setErrorSubject(true)
        }
        if(name === '' && email === '' && message === '' && subject === ''){
            setErrorName(true)
            setErrorEmail(true)
            setErrorSubject(true)
            setErrorMessage(true)
        } 
        return false;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (checkForm()) {
            setSent(true);
            emailjs.sendForm('service_mvixdaj', 'template_rysxfag', form.current, 'user_Fvqr4uQEqPGfs4HBLeijn')
            .then(() => {
                setMailSent(true);
                setInterval(() => {
                    setMailSent(false);
                    setSent(false);
                }, 3000);
            }, (error) => {
                console.log(error.text);
            });
        }else{
            console.log('error')
        }
    };

    return (
        <Modal noCloseButton={true} title={title} isOpen={isOpen} onClose={onClose}>
            {!mailSent ?
                <FormWrapper ref={form} onSubmit={(e) => sendEmail(e)}>
                    <ItemForm>
                        <Input className={errorName ? 'error' : ''} onChange={(e) => {setErrorName(false); setName(e.target.value)}} type="text" name="name" placeholder="Name"/>
                    </ItemForm>
                    <ItemForm>
                        <Input className={errorEmail ? 'error' : ''} onChange={(e) => {setErrorEmail(false); setEmail(e.target.value)}} type="email" name="email" placeholder="Email"/>
                    </ItemForm>
                    <ItemForm>
                        <Input className={errorSubject ? 'error' : ''} onChange={(e) => {setErrorSubject(false); setSubject(e.target.value)}} type="text" name="subject" placeholder="Subject"/>
                    </ItemForm>
                    <ItemForm>
                        <Textarea className={errorMessage ? 'error' : ''} onChange={(e) => {setErrorMessage(false); setMessage(e.target.value)}} rows={'5'} name="message" placeholder="Message"/>
                    </ItemForm>
                    {!sent ?
                        <SubmitButton type="submit">Send</SubmitButton>
                        :
                        <Flex justifyContent="center" alignItems="center" flexDirection="column">
                            <CustomLoader size={50} />
                        </Flex>
                    }
                </FormWrapper>
                :
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                    <Heading color="white" fontFamily="DM Sans" fontSize={[4]}>Thank you for your message!</Heading>
                    <Heading color="white" fontFamily="DM Sans" fontSize={[2]}>We will get back to you as soon as possible.</Heading>
                </Flex>
            }
        </Modal>
    )
}

export const Modal = ({isOpen, onClose, title, noCloseButton, children}) => {
    const wrapperRef = React.createRef();
    const {clicked} = useOutsideAlerter(wrapperRef);

    useEffect(() => {
        if (clicked) {
            onClose();
        }
        if(isOpen) document.body.style.overflowY = 'hidden' 
        else document.body.style.overflowY = 'auto';
    }, [clicked, isOpen]);

    return(
        isOpen &&
        <ModalWrapper>
            <ModalInner ref={wrapperRef}>
                <ModalHeader title={title} close={(e) => onClose(e)} />
                <Flex overflowY={'scroll'} flexDirection="column" alignItems="center">
                    {children}
                </Flex>
                {!noCloseButton && 
                    <Flex mt={3} justifyContent="center" width={'100%'}>
                        <Button px={4} sx={{border: 'solid 1px transparent', '&:hover': {border: 'solid 1px #6CF057', cursor: 'pointer'}}} bg="#669566" color="#6CF057" onClick={(e) => onClose(e)}>Close</Button>
                    </Flex>                
                }
            </ModalInner>            
        </ModalWrapper> 
    )
}
