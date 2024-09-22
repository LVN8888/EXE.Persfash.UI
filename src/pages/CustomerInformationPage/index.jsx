import Footer from "../../components/layouts/Footer";
import MainHeader from "../../components/layouts/MainHeader"
import { CustomerInformation } from "../../components/partials/CustomerInformation"

export const CustomerInformationPage = () => {
    return (
        <>
          <MainHeader />
          <CustomerInformation />
          <Footer />
        </>
    )
}