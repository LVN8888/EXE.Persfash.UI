import React from 'react'
import MainHeader from "../../components/layouts/MainHeader";
import Footer from "../../components/layouts/Footer";
import PricingSection from '../../components/partials/CustomerSubscription/PricingSection';
import SubscriptionSection from '../../components/partials/CustomerSubscription/SubscriptionSection';
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


export default function PlanPage () {
    return (
        <>
           <MainHeader />
           <SubscriptionSection />
           <PricingSection />
           <Footer />
           <ToastContainer />
        </>
    )

}

