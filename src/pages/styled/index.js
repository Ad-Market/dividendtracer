import styled from "styled-components";

export const Container = styled.div`
    display: block;
    margin: 0 auto;
    padding: 0rem 15px 2rem;
    @media (min-width: 768px) {
        max-width: 900px;
    }
    @media (min-width: 1200px) {
        max-width: 790px;
        padding: 1rem 20px 2rem;
    }
`