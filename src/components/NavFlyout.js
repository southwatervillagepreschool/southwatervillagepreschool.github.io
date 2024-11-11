import React, { useState } from "react"
import { connect } from "react-redux"

import { motion, AnimatePresence } from "framer-motion"

import styled from "styled-components"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { useLocation } from "@reach/router"

const NavFlyout = ({ navVisibility, dispatch }) => {
  const [aboutIsOpen, toggleAbout] = useState(false)

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

  const handleNavigation = (e, route) => {
    e.preventDefault()
    toggleAbout(false)
    if (pathname !== route) {
      // allow page to change before we close the nav
      // dispatch asynchronously using setTimeout of 0
      setTimeout(() => dispatch({ type: "CLOSE_NAV" }), 0)
      // the nav should stay open for a bit after the page changes
      navigate(route)
    } else {
      dispatch({ type: "CLOSE_NAV" })
    }
  }

  const handleToggle = e => {
    e.preventDefault()
    toggleAbout(currentState => !currentState)
  }

  return (
    <Container className={navVisibility ? "open" : ""}>
      <button
        onClick={() => dispatch({ type: "TOGGLE_NAV" })}
        className={navVisibility ? "nav__toggle nav-open" : "nav__toggle"}
      >
        <div className="hamburger"></div>
      </button>
      <List>
        <li>
          <a href="/" onClick={e => handleNavigation(e, "/")}>
            Home
          </a>
        </li>

        <li>
          <a
            className={aboutIsOpen ? "about toggled" : "about"}
            onClick={e => handleToggle(e)}
            href="/about"
          >
            About
          </a>
          <AnimatePresence>
            {aboutIsOpen && (
              <motion.ul
                className="about-list "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: 2,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {data.allFile.nodes.map(singleArticle => {
                  const { frontmatter } = singleArticle.childMarkdownRemark
                  const { title } = frontmatter
                  const formattedTitle = title
                    ? title.replace(/ /g, "-").toLowerCase()
                    : ""
                  return (
                    <li key={title}>
                      <a
                        href={`/about/${formattedTitle}`}
                        onClick={e =>
                          handleNavigation(e, `/about/${formattedTitle}`)
                        }
                      >
                        {title}
                      </a>
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        <li>
          <a href="/vacancies" onClick={e => handleNavigation(e, "/vacancies")}>
            Vacancies
          </a>
        </li>
        <li>
          <a
            href="/virtual-tour"
            onClick={e => handleNavigation(e, "/virtual-tour")}
          >
            Virtual Tour
          </a>
        </li>
        <li>
          <a href="/news" onClick={e => handleNavigation(e, "/news")}>
            News
          </a>
        </li>
        <li>
          <a href="/contact" onClick={e => handleNavigation(e, "/contact")}>
            Contact
          </a>
        </li>
      </List>
    </Container>
  )
}

const mapStateToProps = state => ({
  navVisibility: state.message.navVisibility,
})
export default connect(mapStateToProps)(NavFlyout)

const Container = styled.div`
  box-sizing: border-box;

  /* background: #ff5a46; */
  background: #a046b9;
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
  align-items: flex-start;
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
    /* border: solid white 1px; */
    box-shadow: none;
    border: none;
    background: inherit;
    color: #fff;
    /* font-size: 1.2rem; */
    z-index: 12;
  }
`

const List = styled.ul`
  /* border: solid #fff 2px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0;

  li {
    margin: 0.3em;
    display: block;
    max-width: 60vw;
    /* border: solid black 2px; */
    list-style-type: none;
  }

  /* .contact-usx {
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
  } */

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
    /* height: 0em; */
    /* opacity: 0; */
    padding-left: 16px;
    /* transition: height 250ms ease-in-out, opacity 300ms ease-in-out; */
  }
  .open {
    /* height: auto; */
    /* opacity: 1; */
  }
`
