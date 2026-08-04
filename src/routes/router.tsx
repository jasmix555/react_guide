import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DocsLayout } from '@/layouts/DocsLayout'
import { GuidePage } from '@/pages/GuidePage'
import { Home } from '@/pages/Home'
import { NotFoundStandalone } from '@/pages/NotFound'
import { RouteError } from '@/pages/RouteError'

export const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <RouteError /> },
  // Tab index pages land in a later phase; jump to the first page for now.
  { path: '/recipes', element: <Navigate to="/recipes/modal" replace /> },
  { path: '/libraries', element: <Navigate to="/libraries/goal" replace /> },
  {
    element: <DocsLayout />,
    errorElement: <RouteError />,
    children: [
      { path: 'guide/*', element: <GuidePage /> },
      { path: 'recipes/*', element: <GuidePage /> },
      { path: 'libraries/*', element: <GuidePage /> },
    ],
  },
  { path: '*', element: <NotFoundStandalone /> },
])
