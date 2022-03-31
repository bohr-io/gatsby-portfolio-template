import { GatsbyImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'
import arrowSvg from '../../../assets/svg/arrow.svg'
import Text from '../../Text'
import * as styles from './styles.module.css'

const DesktopDisplay = ({ projects }) => {
  const [projectsPage, setProjectsPage] = React.useState(0)
  const [selectedProject, setSelectedProject] = React.useState(0)
  const [isDetailing, setIsDetailing] = React.useState(false)
  const detailedProject = projects[selectedProject]

  const isFirstPage = projectsPage <= 0
  const isLastPage = projectsPage >= (projects.length % 3 === 0 ?
                                      Math.floor(projects.length / 3) - 1 :
                                      Math.floor(projects.length / 3))

  const handlePrevPage = () => {
    if (isFirstPage) return
    setProjectsPage((old) => old - 1)
  }
  
  const handleNextPage = () => {
    if (isLastPage) return
    setProjectsPage((old) => old + 1)
  }
  
  const handleSelectProject = (index) => {
    setSelectedProject(index)
    setIsDetailing(true)
  }

  const handleCloseDetail = () => setIsDetailing(false)

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.projectsList} style={{ '--project-page': projectsPage }}>
        {projects.map(({ name, image, imageAlt }, i) => (
          <button
            key={name}
            className={styles.selectionBtn}
            onClick={() => handleSelectProject(i)}
          >
            <GatsbyImage image={image} alt={imageAlt} className={styles.projectImg} />
            <Text
              variant='paragraph'
              color={isDetailing && i === selectedProject ? 'secondary' : 'primary'}
            >
              {name}
            </Text>
          </button>
        ))}
      </div>

      <button
        type='button'
        onClick={handlePrevPage}
        disabled={isFirstPage}
        className={styles.prevBtn}
        aria-label='previous project'
      >
        <img src={arrowSvg} alt="" />
      </button>
      <button
        type='button'
        onClick={handleNextPage}
        disabled={isLastPage}
        className={styles.nextBtn}
        aria-label='next project'
      >
        <img src={arrowSvg} alt="" />
      </button>   

      {isDetailing && <div className={styles.projectDetail}>
        <GatsbyImage image={detailedProject.image} alt={detailedProject.imageAlt} className={styles.detailedProjectImg} objectFit='scale-down' />
        <div>
          <Text tag='h3' variant='paragraph'>{detailedProject.name}</Text>
          <MDXRenderer>{detailedProject.desc}</MDXRenderer>
          <button
            className={styles.closeDetailBtn}
            onClick={handleCloseDetail}
          >
            <img src={arrowSvg} alt="" />
          </button>
        </div>
      </div>}
    </div>
  )
}

export default DesktopDisplay
