import React from "react"

import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import MenuButton from "./MenuButton"

const NavLargeScreens = () => {
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
  return (
    <Nav role="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
          <ul>
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
        {/* <li>
          <Link to="/vacancies">Vacancies</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li> */}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {/* <li>
          {" "}
        </li> */}
      </ul>

      <MenuButton />
    </Nav>
  )
}

export default NavLargeScreens

const Nav = styled.nav`
  a {
    text-decoration: none;
    display: block;
    padding: 0.3rem;
    background: transparent;
    /* background: gray; */
    color: inherit;
    font-size: 1rem;
    text-transform: capitalize;
  }

  nav {
    font-family: monospace;
  }

  ul {
    /* background: darkorange; */
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    color: #0d0d0d;
    background: #eff0f3;
    display: block;
    float: left;
    padding: 0.2rem;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;
  }

  li a {
    color: #0d0d0d;
  }

  li:hover,
  li:focus-within {
    background: #a046b9;
    cursor: pointer;
    /* color: white; */
  }
  li:hover a,
  li:focus-within a {
    color: white;
  }

  li:focus-within a {
    outline: none;
  }

  ul li ul {
    background: orange;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 0.2rem;
    left: 0;
    display: none;
    z-index: 9;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  ul li:hover > ul,
  ul li:focus-within > ul,
  ul li ul:hover,
  ul li ul:focus {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  ul li ul li {
    clear: both;
    width: 200%;
    color: #0d0d0d;
  }
  li:hover ul li a,
  li:focus-within ul li a {
    color: #0d0d0d;
  }
  li:hover ul li a:hover,
  li:focus-within ul li:focus-within a {
    color: #fff;
  }
`
