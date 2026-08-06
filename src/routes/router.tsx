import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import { DocsLayout } from '@/layouts/DocsLayout'
import { DEFAULT_LOCALE, type Locale, LOCALES } from '@/lib/i18n'
import { GuidePage } from '@/pages/GuidePage'
import { Home } from '@/pages/Home'
import { NotFoundStandalone } from '@/pages/NotFound'
import { RouteError } from '@/pages/RouteError'

// Every language gets the same route shape under its own "/{locale}" prefix.
function localeRoutes(locale: Locale): RouteObject[] {
  return [
    { path: locale, element: <Home />, errorElement: <RouteError /> },
    // Tab index pages land in a later phase; jump to the first page for now.
    { path: `${locale}/recipes`, element: <Navigate to={`/${locale}/recipes/modal`} replace /> },
    { path: `${locale}/libraries`, element: <Navigate to={`/${locale}/libraries/goal`} replace /> },
    {
      element: <DocsLayout />,
      errorElement: <RouteError />,
      children: [
        { path: `${locale}/guide/*`, element: <GuidePage /> },
        { path: `${locale}/recipes/*`, element: <GuidePage /> },
        { path: `${locale}/libraries/*`, element: <GuidePage /> },
      ],
    },
  ]
}

export const router = createBrowserRouter(
  [
    // "/" (and the bare base path) opens the default language.
    { path: '/', element: <Navigate to={`/${DEFAULT_LOCALE}`} replace /> },
    ...LOCALES.flatMap(localeRoutes),
    { path: '*', element: <NotFoundStandalone /> },
  ],
  {
    // Matches Vite's `base`, so routes resolve whether served at "/" (dev) or the
    // /study/react_guide/ subfolder (prod build). BASE_URL is set by Vite.
    basename: import.meta.env.BASE_URL,
  },
)
