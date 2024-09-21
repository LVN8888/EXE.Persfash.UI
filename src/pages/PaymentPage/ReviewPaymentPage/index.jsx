import { ToastContainer } from "react-toastify"
import MainHeader from "../../../components/layouts/MainHeader"
import Footer from "../../../components/layouts/Footer"
import ReviewPayment from "../../../components/partials/Payment/ReviewPayment"

export default function ReviewPaymentPage() {
    return (
        <>
        <MainHeader />
        <ReviewPayment />
        <Footer />
        <ToastContainer />
        </>
    )
}