import styled from 'styled-components';
import {Flex, Button} from "rebass";

export const HeaderWrapper = styled(Flex)`
    padding: 20px 40px;
    @media (max-width: 768px) {
        padding: 10px 15px;
    }
`

export const LogoWrapper = styled.a`
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: 'DM Sans';
    color: white;
    text-decoration: none;
    cursor: pointer;
    svg{
        max-width: 60px;
        height: auto;
    }
    h1{
        margin: 0;
        @media (max-width: 768px) {
            font-size: 1.3em;
            width: 50%;
            line-height: 1em;
        }
        @media (max-width: 500px) {
        display: none;
        }
    }
    &:hover{
        text-decoration: none;
    }
`

export const ActionsWrapper = styled.div`
    display: flex;
    align-items: stretch;
    gap: 20px;
    @media (max-width: 768px) {
        gap: 10px;
    }
`

export const WalletButton = styled.button`
    background: ${props => props.error ? 'rgb(255, 67, 67)': 'rgba(169, 254, 167, 0.55)'};
    border-radius: 10px;
    padding: 10px 20px;
    border: solid 1px transparent;
    font-family:'DM Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    color:  ${props => props.error ? 'white' : '#6CF057'};
    cursor: pointer;
    @media (min-width: 768px) {
        font-size: 18px;
    }
`

export const AccountAddress = styled.div`
    font-family: 'DM Sans';
    font-size: 16px;
    color: #FFFFFF;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`

export const AccountIcon = styled.div`
    width: 40px;
    height: 40px;  
    border-radius: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: fit-content;
    width: fit-content;
    canvas{
        width: 100% !important;
        height: 100% !important;
        border-radius: 100%;
    }
`

export const OptionsButton = styled.button`
    padding: 10px;
    border: solid 1px transparent;
    background: rgba(94, 94, 94, 0.15);
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    min-height: 40px;
    height: 100%;
`

export const OptionsMenu = styled.div`
    padding: 0.7rem 1rem;
    background: #1F1F21;
    min-width: 180px;
    border-radius: 18px;
    border: 1px solid rgb(25, 27, 31);
    display: grid;
    font-family: 'DM Sans';
    font-size: 16px;
    color: #FFFFFF;
    width: max-content;
    @media (max-width: 768px) {
        font-size: 14px;
    }
    >div{
        width: 100%;
    }
    a:hover{
        color: white;
        cursor: pointer;
        svg{opacity: 0.6;}
    }
    
`

export const OptionsWrapper = styled.div`
    position: relative;
    >button{
        border: ${props => props.active ? 'solid 1px #6CF057' : ''};
        &:hover{
            border: solid 1px #6CF057;
        }
    } 
    ${props => props.active && `
        &::after{
            content: '';
            position: fixed;
            top: 0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9;
        }`
        
    }
`

export const OptionsMenuWrapper = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    padding-top: 20px;
    z-index: 10;
`

export const ConnectorButton = styled(Button)`
    border-radius: 10px;
    border: none;
    font-family:'DM Sans';
    font-size: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    color: black;
    cursor: pointer;
    position: relative;
    display: inline-flex !important;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    img{
        max-width: 20px;
    }
    @media (min-width: 768px) {
        font-size: 14px;
    }
    &:hover{
        opacity: 0.8;
    }
`

export const AccountWrapper = styled(OptionsButton)`
    display: flex;
    align-items: center;
    ${'' /* padding: 0 20px; */}
    gap: 15px;
    &:hover{
        border: solid 1px #6CF057;
    }
`

export const TelegramButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(94,94,94,0.15);
    border-radius: 10px;
    border: solid 1px transparent;
    color: #fff;
    font-size: 16px;
    padding: 10px; 
    gap: 15px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 10px 20px;
    &:hover {        
        border: solid 1px #6CF057;
    }
`

export const SubMenuWrapper = styled(OptionsWrapper)``

export const MenuWrapper = styled(OptionsMenuWrapper)``

export const Menu = styled(OptionsMenu)`
    ${'' /* grid-template-columns: min-content; */}
`
