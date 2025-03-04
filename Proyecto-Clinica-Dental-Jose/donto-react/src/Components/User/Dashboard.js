import React, { Component } from 'react'
import Header from '../HeaderTwo/Header';
import FooterOne from '../Footer/FooterOne';
import FooterData from '../Data/FooterData';
import HeroOne from '../Hero/HeroOne';
import FeaturesOne from '../Features/FeaturesOne';
import AboutOne from '../About/AboutOne';
import ServiceOne from '../Service/ServiceOne';
import TeamOne from '../Team/TeamOne';
/* import Appointment from './Appointment' */
import GalleryOne from '../Gallery/GalleryOne';
import TestimonailOne from '../Testimonial/TestimonailOne';
import BlogOne from '../Blog/BlogOne';
import Promo from '../Promo';
import ClientLogos from '../ClientLogos';
import BlogData from '../Data/BlogData';
import ServiceData from '../Data/ServiceData';
import FeaturesData from '../Data/FeaturesData';
import TeamData from '../Data/TeamData';

class HomeTwo extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <HeroOne />
                <FeaturesOne FeaturesData={FeaturesData} />
                <AboutOne />
                <ServiceOne ServiceData={ServiceData} />
                <TeamOne TeamData={TeamData} />
                {/* <Appointment /> */}
                <GalleryOne />
                <TestimonailOne />
                <BlogOne BlogData={BlogData} />
                <Promo />
                <ClientLogos />
                <FooterOne FooterData={FooterData} />
            </React.Fragment>
        )
    }
}

export default HomeTwo