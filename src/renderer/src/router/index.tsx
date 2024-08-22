import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import '@remix-run/router'
import Layout from '../layout'
import Setting from '../views/setting'

export const router: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'setting',
        element: <Setting />
      }
    ]
  }
]

export const route = createBrowserRouter(router)

export default route
