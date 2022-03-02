import React from "react";
import { useHistory } from "react-router";
import { Footer } from "../components/Footer/Footer";
import { Tracker } from "../components/Tracker/Tracker";
import { Container } from "./styled";

const HomePage = () =>{
    const history = useHistory();
    return (
        <Container>
            <Tracker history={history} />
            <Footer />
        </Container>
    );

}

export default HomePage;