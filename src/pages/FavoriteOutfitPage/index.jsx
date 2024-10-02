import { Footer } from "antd/es/layout/layout"
import MainHeader from "../../components/layouts/MainHeader"
import { FavoriteOutift } from "../../components/partials/Outift/FavoriteOutfits"

export const FavoriteOutfitPage = () => {
    return (
        <>
        <MainHeader/>
        <FavoriteOutift/>
        <Footer/>
        </>
    )
}