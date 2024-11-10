import {
  StrictMode,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Code404 from './Code404'

interface AppRoute {
  path: string
  component: React.FC
}

// Context to export functionality
const RoutesContext = createContext<{
  routes: AppRoute[]
  addNoteRoute: (newUUID: string) => void
}>({
  routes: [],
  addNoteRoute: () => {},
})

interface RoutesProviderProps {
  children: ReactNode // Accept any react node as children
}

const RoutesProvider: React.FC<RoutesProviderProps> = ({ children }) => {
  // Setting initial routes and declaring the state
  const [routes, setRoutes] = useState<AppRoute[]>([
    { path: '/', component: App },
    { path: '*', component: Code404 },
  ])

  // Mount routes from local storage when load
  useEffect(() => {
    const keys = Object.keys(localStorage)
    const storedRoutes = keys.map((key) => {
      return {
        path: key,
        component: App /* App already contains "TaskContent" so we dont 
        need put more components of necesary, also you could include if u need it,
        but you will have to change somethings */,
      }
    })
    setRoutes((prevRoutes) => [...prevRoutes, ...storedRoutes])
  }, [])

  const addNoteRoute = (newUUID: string) => {
    const newRoute: AppRoute = {
      path: newUUID,
      component: App, // Same logic of up
    }

    setRoutes((prevRoutes) => [...prevRoutes, newRoute])
  }

  return (
    <RoutesContext.Provider value={{ routes, addNoteRoute }}>
      {children}
    </RoutesContext.Provider>
  )
}

export const useRoutes = () => useContext(RoutesContext)

const MainApp = () => {
  const { routes } = useRoutes()

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
        <Route path="*" element={<Code404 />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesProvider>
      <MainApp />
    </RoutesProvider>
  </StrictMode>
)
