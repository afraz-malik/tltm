import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OurPlans from "../../components/OurPlans/OurPlans";
import NavBar from "../../components/NavBar/NavBar";
import OurPromise from "../../components/OurPromise/new/OurPromise";
import OurServices from "../../components/OurServices/OurServices";
import Trusters from "../../components/Trusters/Trusters";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import LightSpeed from "react-reveal/LightSpeed";

const HomePage = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <NavBar />
            <Header />
            <Slide left>
                <OurServices />
            </Slide>
            <Fade bottom>
                <OurPromise />
            </Fade>
            <LightSpeed>
                <OurPlans />
            </LightSpeed>
            <Trusters />
            <Footer />
        </div>
    );
};

export default HomePage;
