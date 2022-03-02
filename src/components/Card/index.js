import styled from 'styled-components';
import { Flex } from "rebass";

export const Card = styled(Flex)`
    background: #23262F;
    border-radius: 10px;
    padding: 40px 50px;
    margin-top: 1rem;
    @media (max-width: 768px) {
        padding: 20px;
    }
`
