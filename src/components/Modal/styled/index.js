import styled from 'styled-components';

export const ModalHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 1rem;
    width: 100%;
    button{
        border: none;
        background: transparent;
        cursor: pointer;
        color: white;
        font-size: 30px;
        margin: 0;
        padding: 0;
        &:hover{
            opacity: 0.5;
        }
    }   
`

export const ModalWrapper = styled.div`
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
`

export const ModalInner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    background-color: rgb(25, 27, 31);
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 10px 20px 20px;
    z-index: 99;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    form{
        @media screen and (min-width: 760px){
            width: 90%;
        }
    }
    li{
        font-size: 16px;
        @media screen and (max-width: 760px){
            font-size: 14px;
        }
    }
    @media screen and (max-width: 760px){
       width: 80%;
    }
}
`