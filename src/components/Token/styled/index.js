import styled from 'styled-components';

export const TokenIcon = styled.img`
    width: ${props => props.size ? props.size : '60px'};
    height: ${props => props.size ? props.size : '60px'};
    border-radius: 100%;
`

export const TokenName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;    
    align-self: center;
`


export const AddressLink = styled.div`
    color: #B1B5C4;
    font-family 'ABeeZee';
    margin-top: 4px;
    font-size: 14px;
    text-decoration: none;
    @media screen and (max-width: 768px) {
        font-size: 12px;
    }
`