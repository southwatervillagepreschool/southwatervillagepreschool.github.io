import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const SencoLogo = () => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "EY_SENCO.png" }) {
        childImageSharp {
          fixed(height: 100, width: 500, quality: 100) {
            srcSet
            src
          }
        }
      }
    }
  `)
  const { srcSet, src } = data.file.childImageSharp.fixed
  return (
    <img
      style={{ height: "100px", width: "500px" }}
      className="logo-ofsted"
      srcSet={srcSet}
      src={src}
      alt="OFSTED rated good Logo"
    />
  )
}

export default SencoLogo
