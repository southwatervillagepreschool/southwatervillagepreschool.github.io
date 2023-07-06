import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Hero2 from "../components/Hero"
import PageArticles from "../components/PageArticles"

import ArticleList from "../components/ArticleList"
// import { NavDispatchContext } from "../NavigationProviders"

const About = () => {
  // const navStatus = useContext(NavContext)
  // const setNavStatus = useContext(NavDispatchContext)

  // console.log("status:", navStatus)
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "aboutPage" } }
        sort: { fields: childMarkdownRemark___frontmatter___order, order: ASC }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              title
              order
            }
            html
          }
        }
      }
      file(relativePath: { eq: "2023_1.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const articles = [...data.allFile.nodes]
  return (
    <Layout>
      <Hero2
        fluidImage={data.file.childImageSharp.fluid}
        imageAlt=""
        tagLine="About Our Preschool"
      />
      <ArticleList listOfArticles={articles} />
      <PageArticles listOfArticles={articles} />
    </Layout>
  )
}

export default About
