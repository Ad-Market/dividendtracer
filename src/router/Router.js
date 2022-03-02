import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header/Header";
import { ResultsPageWrapper } from "../pages/Results";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrendingsMarquee } from "../components/Trendings/TrendingsMarquee";
import { ModalAnnouncement } from "../components/Modal/ModalAnnoucement";
import { Banner } from "../components/Banner/Banner";

const AppRouter = () => {

    return (
        <Router>
            <Banner />
            <ToastContainer theme='dark' />
            <TrendingsMarquee />
            <Header />
            <Route default path="/" exact component={Home} />
            <Route path="/results" component={ResultsPageWrapper} />
            <ModalAnnouncement />
        </Router>
    )
}

export default AppRouter;
