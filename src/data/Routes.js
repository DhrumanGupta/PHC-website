import React from 'react'

export const navbarRoutes = [
  {
    name: <b>PSN Hack Club</b>,
    route: '/',
  },
  {
    name: 'About',
    route: '/about',
  },
  {
    name: 'Alumni',
    route: '/alumni',
  },
  {
    name: 'Gallery',
    route: '/gallery',
  },
  {
    name: 'Join',
    route: '/join',
  },
]

const baseRoute =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1337'
    : 'https://server.psn.hackclub.com'

export const ApiRoutes = {
  join: `${baseRoute}/join`,
}
