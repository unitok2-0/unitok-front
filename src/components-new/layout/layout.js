import CtaCall from "../ui/cta-call";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";

export default function Layout({ children, classe, headerWhite, mobileIconsColors }) {
  return (
    <>
      <Meta />
      <div className={classe}>
        <Header headerWhite={headerWhite} mobileIconsColors={mobileIconsColors} />
        <main>{children}</main>
        <CtaCall />
        <Footer />
      </div>
    </>
  )
}