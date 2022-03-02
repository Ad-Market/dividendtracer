import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    color: white;
    border-collapse: collapse;
    td, th{
        text-align: left;
        padding: 10px 0;
    }
    thead > tr{
        :first-child{
            display: none;
        }
        flex: 1;
        border-bottom: 1px solid #fff;
    }
    tr{
        >:first-child{
            width: 50%;
        }
        >:nth-child(2){
            width: 25%;
            text-align: right;
        }
        >:nth-child(3){
            width: 25%;
            text-align: right;
        }
        @media (max-width: 768px) {
            display: flex;
            font-size: 14px;
            >:first-child{
                flex: 1;
                width: auto;
            }
            >:nth-child(2){
                flex: 1;
                width: auto;
            }
            >:nth-child(3){
                flex: 1;
                width: auto;
            }
        }
    }
    thead{
        position: relative;
    }
`

export const PageButton = styled.button`
    color: #f7f8f8;
    background: #24262f;
    border: solid 1px #6CF057;
    border-radius: 3px;
    height: 30px;
    width: 30px;
    margin: 0 10px;
    font-family: 'DM Sans';
    font-weight: bold;
    font-size: 14px;
    cursor: pointer; 
    display: ${props => props.disabled ? 'none' : 'block'};   
    &:hover {
        border: solid 1px #6CF057;
    }
    &.active{
        background: #f7f8f8;
        color: #24262f;
    }
`