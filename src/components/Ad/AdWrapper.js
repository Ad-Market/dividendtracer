import React from 'react';
import {Box} from "rebass";
import styled from 'styled-components';
import SNKRSGif from '../../assets/images/ads/snkrs-2.gif';

const AdWrapper = styled.a`
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    height: 100%;
    img{
        width: 100%;
    }
`

const PromoteMessage = () => <Box color="#B1B5C4" sx={{'a': {color: 'inherit', textDecoration: 'none'}}} fontSize={['12px', 1]} fontFamily='DM Sans' mt={2} textAlign="center">Want to promote your token ? Contact us at <a href="mailto:dividendtracer@gmail.com"><strong>dividendtracer@gmail.com</strong></a></Box>

export const Ads = () => {
    return (
        <>
            <AdWrapper id='adWrapper' target='_blank' href="https://www.green-snkrs.com">
                <img src={SNKRSGif} alt="" />
            </AdWrapper>
        </>
    );
};