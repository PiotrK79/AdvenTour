import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.tsx'
import { GroupProvider } from './context/GroupContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GroupProvider>
      <App />
    </GroupProvider>
  </StrictMode>,
)
