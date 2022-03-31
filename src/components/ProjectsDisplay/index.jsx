import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import DesktopDisplay from './DesktopDisplay'
import MobileDisplay from './MobileDisplay'

const query = graphql`{
  allMdx {
    nodes {
      body
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
}`

const formatProjectsData = (data) => {
  const projectsData = data.allMdx.nodes

  return projectsData.map((project) => ({
    name: project.frontmatter.title,
    image: getImage(project.frontmatter.image),
    imageAlt: project.frontmatter.imageAlt,
    desc: project.body
  }))
}

const isBrowser = () => typeof window !== 'undefined'
const isDesktop = () => window.innerWidth >= 920

const ProjectsDisplay = () => {
  const data = useStaticQuery(query)
  const projects = formatProjectsData(data)
  
  const [isDesktopLayout, setIsDesktopLayout] = React.useState(isBrowser() && isDesktop())

  React.useEffect(() => {
    if (!isBrowser()) return
    const handleResize = () => setIsDesktopLayout(isDesktop())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isDesktopLayout) return <DesktopDisplay projects={projects} />
  else return <MobileDisplay projects={projects} />
}

export default ProjectsDisplay
