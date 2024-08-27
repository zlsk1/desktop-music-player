import './styles/base.css'
import './styles/common.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  RouterProvider
} from 'react-router-dom'
import { route } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        cssVar: true,
        components: {
          Menu: {
            itemBg: 'rgb(243 244 246)'
          }
        }
      }}
      locale={zhCN}
    >
      <RouterProvider router={route} />
    </ConfigProvider>
  </React.StrictMode>
)
