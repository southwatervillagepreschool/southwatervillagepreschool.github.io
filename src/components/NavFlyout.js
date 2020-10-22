import React, { useContext, useState } from "react"
import styled from "styled-components"
import { navigate, useStaticQuery, graphql, Link } from "gatsby"
import { useLocation } from "@reach/router"
import { NavContext, NavDispatchContext } from "../NavigationProviders"

const NavFlyout = () => {
  const [aboutIsOpen, toggleAbout] = useState(false)

  const navStatus = useContext(NavContext)
  const setNavStatus = useContext(NavDispatchContext)
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "aboutPage" }
          childMarkdownRemark: { frontmatter: { order: { gt: 0 } } }
        }
        sort: { fields: childMarkdownRemark___frontmatter___order, order: ASC }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              title
              order
            }
          }
        }
      }
    }
  `)
  const { pathname } = useLocation()

  const handleToggle = e => {
    e.preventDefault()
    // console.log("toggle", aboutIsOpen)
    toggleAbout(currentState => !currentState)
  }

  // const handleLinkClick = (e, value) => {
  //   e.preventDefault()
  //   console.log(`you clicked:${(e, value)}`)
  //   const splitPathname = value.split("#")
  //   if (pathname === splitPathname[0]) {
  //     // console.log("toggle fsaffdsdfs")
  //     setNavStatus()
  //     if (splitPathname[1]) {
  //       navigate(`#${splitPathname[1]}`)
  //     }
  //   } else {
  //     navigate(value)
  //   }

  //   // setTimeout(() => navigate(value), 200)
  // }

  const close = e => {
    e.preventDefault()
    setNavStatus()
  }
  // console.log(JSON.stringify(data.allFile.edges, null, 4))
  // console.log(aboutIsOpen)
  return (
    <Container className={navStatus ? "open" : ""}>
      <button onClick={e => close(e)}>X</button>
      <List>
        <li>
          <Link to="/">home</Link>
        </li>

        <li>
          <a
            className={aboutIsOpen ? "about toggled" : "about"}
            onClick={e => handleToggle(e)}
            href="/about"
          >
            About
          </a>

          <ul className={aboutIsOpen ? "about-list open" : "about-list"}>
            {data.allFile.nodes.map(singleArticle => {
              const { frontmatter } = singleArticle.childMarkdownRemark
              const { title } = frontmatter
              const formattedTitle = title
                ? title.replace(/ /g, "-").toLowerCase()
                : ""
              return (
                <li key={title}>
                  <Link to={`/about/${formattedTitle}`}>{title}</Link>
                </li>
              )
            })}
          </ul>
        </li>

        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/contact" className="contact-us">
            contact
          </Link>
        </li>
      </List>
    </Container>
  )
}

export default NavFlyout

// const About=({toggle})=>{
// return (
//   <li
//     className="about"
//     onClick={() => toggleAbout(currentState => !currentState)}
//   >
//     about
//   </li>
// )
// }
const Container = styled.div`
  box-sizing: border-box;

  /* background: #ff5a46; */
  background: rgb(184, 7, 42);
  width: 50vw;
  height: 100vh;
  left: +100vw;
  top: 0;
  z-index: 10;
  position: fixed;
  /* opacity: 1; */
  transition: transform 250ms ease-in-out;
  &&.open {
    /* opacity: 1; */
    transform: translateX(-50vw);
  }
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 16px;
  a {
    background: inherit;
    border: none;
  }
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: solid white 1px;
    box-shadow: none;
    border: none;
    background: inherit;
    color: #fff;
    font-size: 1.2rem;
    z-index: 12;
  }
`

const List = styled.ul`
  /* border: solid #fff 2px; */
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  margin: 0;
  padding: 0;

  li {
    margin: 0.3em;
    display: block;
    max-width: 60vw;
    /* border: solid black 2px; */
    list-style-type: none;
  }

  .contact-usx {
    border-radius: 25px;
    border: solid 3px #fff;
    padding: 0.4em 0.6em;
    margin-top: 1em;
    transition: background 200ms ease-in-out, color 200ms ease-in-out,
      border 200ms ease-in-out;
    & :hover {
      background: #fff;
      color: #ff5a46;
      border-color: #ff5a46;
    }
  }

  a {
    position: relative;
    text-decoration: none;
    color: #fff;
    font-size: 1em;
    /* text-align: right; */
    display: block;
    text-transform: uppercase;
    padding: 0.2rem;
    /* border: solid green 2px; */
  }
  .about::before,
  .about::after {
    content: "";
    height: 0.1em;
    width: 0.6em;
    background: #fff;
    position: absolute;
    left: 4em;
    top: 1em;
    transform: rotate(0deg);
    transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
  }
  .about::after {
    transform: rotate(90deg);
  }
  .toggled::after {
    transform: rotate(180deg);
    opacity: 0;
  }
  .toggled::before {
    transform: rotate(180deg);
  }

  .about-list {
    height: 0em;
    opacity: 0;
    padding-left: 16px;
    transition: height 250ms ease-in-out, opacity 300ms ease-in-out;
  }
  .open {
    height: auto;
    opacity: 1;
  }
`
