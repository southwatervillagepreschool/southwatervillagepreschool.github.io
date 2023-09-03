import React from "react"
import { useLocation } from "@reach/router"
import { Helmet } from "react-helmet"

import "typeface-hind"
import "typeface-roboto"

import Header from "./Header"
import Footer from "./footer"
import NavFlyout from "./NavFlyout"
import OfstedLogo from "./ofsted-logo"
import SencoLogo from './senco_logo'

const Layout = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pathname.replace("/", "") || "home"}</title>
        <link
          rel="canonical"
          href="https://www.southwatervillagepreschool.org/"
        />
        <html lang="en" />
      </Helmet>
      <NavFlyout />
      <Header />
      <main>{children}</main>
      <OfstedLogo />
      <SencoLogo/>
      <Footer />
    </div>
  )
}

export default Layout
