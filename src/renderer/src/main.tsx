import './styles/base.css'
import './styles/common.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      cssVar: true,
      components: {
        Menu: {
          itemBg: 'rgb(243 244 246)'
        }
      }
    }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
