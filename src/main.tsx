import '@fontsource/zen-kaku-gothic-new/500.css'
import '@fontsource/zen-kaku-gothic-new/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import '@/styles/global.scss'

import { MDXProvider } from '@mdx-js/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ReadProgressProvider } from '@/hooks/useReadProgress'
import { mdxComponents } from '@/lib/mdxComponents'
import { router } from '@/routes/router'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found')

createRoot(root).render(
  <StrictMode>
    {/* Read-progress (読んだ toggles + rings) is shared app-wide, so it wraps the router. */}
    <ReadProgressProvider>
      {/* Gives every .mdx page the custom components (Callout, Demo, T, …) without imports. */}
      <MDXProvider components={mdxComponents}>
        <RouterProvider router={router} />
      </MDXProvider>
    </ReadProgressProvider>
  </StrictMode>,
)
