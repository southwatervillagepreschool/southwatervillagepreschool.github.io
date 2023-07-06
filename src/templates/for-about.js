import React from "react"
import Layout from "../components/layout"
import Hero from "../components/Hero"
import { graphql } from "gatsby"

const ForAbout = ({ data }) => {
  const post = data.markdownRemark

  // console.log(post.frontmatter.hideHero || "not shone")

  return (
    <div>
      <Layout>
        <Hero
          fluidImage={data.file.childImageSharp.fluid}
          imageAlt=""
          tagLine={post.frontmatter.title}
        />
        <article>
          {/* working {JSON.stringify(data)} */}
          {/* <h2>{post.frontmatter.title}</h2> */}
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </article>
      </Layout>
    </div>
  )
}

export default ForAbout

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        hideHero
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
`
