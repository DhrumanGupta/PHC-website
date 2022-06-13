import React from 'react'
import styles from '../styles/Navbar.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { navbarRoutes } from '../data/Routes'
import Image from 'next/image'
import { imageDir } from '../data/constants'

const Wrapper = (props) => {
  return <li>{props.children}</li>
}

function NavLink({ to, exact, children, activeClassName, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === to : pathname.startsWith(to)

  if (isActive) {
    props.className = activeClassName
  }

  return (
    <Link href={to}>
      <a {...props}>{children}</a>
    </Link>
  )
}

function Navbar() {
  const routes = navbarRoutes.map((route) => (
    <Wrapper key={route.route}>
      <NavLink activeClassName={styles.selected} to={route.route}>
        {route.name}
      </NavLink>
    </Wrapper>
  ))

  return (
    <div className={styles.container}>
      <span className={styles.logoPadding}>
        <br />
        <Image
          alt="Hack Club Logo"
          src={`${imageDir}/logo64.jpg`}
          className={styles.logo}
          width={60}
          height={60}
        />
      </span>
      <ul className={styles.navbar}>
        <React.Fragment>{routes}</React.Fragment>
      </ul>
    </div>
  )
}

export default Navbar
