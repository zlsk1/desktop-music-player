import { createHashRouter, type RouteObject } from 'react-router-dom'
import '@remix-run/router'
import Layout from '../layout'
import Setting from '../views/setting'
import LocalMusic from '../views/local-music'
import PlayHistory from '../views/play-history'
import UserLike from '../views/user-like'

export const router: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'setting',
        element: <Setting />
      },
      {
        path: 'local-music',
        element: <LocalMusic />
      },
      {
        path: 'play-history',
        element: <PlayHistory />
      },
      {
        path: 'user-like',
        element: <UserLike />
      }
    ]
  }
]

export const route = createHashRouter(router)

export default route
