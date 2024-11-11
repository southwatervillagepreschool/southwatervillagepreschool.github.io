import React from "react"
import { Link } from "gatsby"

// import logo from "../images/logo-square-no-words.png"
import MenuButton from "./MenuButton"
import NavLargeScreens from "./NavLargeScreens"
// import Logo from './logo'
import logo from "../images/2024-logo.png"
// import logo from "../images/logo-square-transparent.svg"

const Header = () => {
  return (
    <header>
      <img
        style={{ height: "80px", width: "80px" }}
        src={logo}
        alt="Southwater village hall preschool logo"
        className="logo"
      />
      <Link to="/">
        <h1 style={{ color: "var(--color-primary)" }}>
          Southwater Village Hall Pre-school
        </h1>
      </Link>
      <MenuButton />
      <NavLargeScreens />
    </header>
  )
}

export default Header
