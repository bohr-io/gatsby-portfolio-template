import clsx from 'clsx'
import * as React from 'react'
import burgerBtn from '../../assets/svg/burger_btn.svg'
import xBtn from '../../assets/svg/x.svg'
import Text from '../Text'
import * as styles from './styles.module.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hoverEffectParams, setHoverEffectParams] = React.useState({
    offset: 0,
    width: 0,
  });

  const links = ['about', 'skills', 'projects', 'contact']

  const handleToggleOpen = () => setIsOpen((old) => !old)

  const handleLinkHover = (e) => {
    const width = e.target.offsetWidth
    const offset = e.target.getBoundingClientRect().left;

    setHoverEffectParams({
      offset,
      opacity: 1,
      width
    })
  }

  return (
    <nav className={clsx([styles.navContainer, isOpen && styles.open])}>
      <button className={styles.navBtn} onClick={handleToggleOpen}>
        <img src={isOpen ? xBtn : burgerBtn} alt="" />
      </button>
      <div
        className={clsx([styles.navBar, isOpen && styles.open])}
        style={{
          '--hover-offset': `${hoverEffectParams.offset}px`,
          '--hover-opacity': hoverEffectParams.opacity,
          '--hover-width': `${hoverEffectParams.width}px`
        }}
      >
        {links.map((link) => (
          <a href={`#${link}`}
            key={link}
            onClick={handleToggleOpen}
            onMouseOver={handleLinkHover}
            onFocus={handleLinkHover}
            onMouseOut={() => setHoverEffectParams(old => ({...old, opacity: 0}))}
            onBlur={() => setHoverEffectParams(old => ({...old, opacity: 0}))}
          >
            <Text variant="subtitle" color="secondary">
              {link.toUpperCase()}
            </Text>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
