import React from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';

const LoaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
`

export const CustomLoader = ({color, size}) => {
    return(
        <LoaderWrapper className="loaderWrapper">
            <Loader 
                type="Oval"
                color={color ? color : '#a3a3a3'}
                height={size ? size : 80}
                width={size ? size : 80}
            />
        </LoaderWrapper>
    )
}