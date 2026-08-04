import type { MDXComponents } from 'mdx/types'

import { Callout, Deeper, JsNote, PartIntro, Std } from '@/components/Callout'
import { CodeFigure, MdxLink } from '@/components/CodeBlock'
import { Demo, DemoSource } from '@/components/Demo'
import { Diff } from '@/components/Diff'
import { Download } from '@/components/Download'
import { Exercise, Together } from '@/components/Exercise'
import { LearnBox, SummaryBox } from '@/components/PageBox'

// Provided to every .mdx page via <MDXProvider>, so authors use these without
// importing anything (see §9 — adding a page is create-file + one nav line).
export const mdxComponents: MDXComponents = {
  a: MdxLink,
  figure: CodeFigure,
  Callout,
  Deeper,
  Std,
  JsNote,
  PartIntro,
  Demo,
  DemoSource,
  Diff,
  Download,
  LearnBox,
  SummaryBox,
  Exercise,
  Together,
}
