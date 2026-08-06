import type { Locale } from '@/lib/i18n'

import { strings as en } from './strings.en'
import { strings as ja } from './strings.ja'

// The Japanese table is the canonical shape; English must structurally match it.
export type Strings = typeof ja
export const stringsByLocale: Record<Locale, Strings> = { ja, en }
