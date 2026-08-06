import { useLocation } from 'react-router-dom'

import { siteByLocale } from '@/config/site'
import { stringsByLocale } from '@/config/strings'
import { type Locale, localeFromPath } from '@/lib/i18n'

/** Active locale, read from the URL's first segment. */
export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname)
}

/** Chrome strings for the active locale. */
export function useStrings() {
  return stringsByLocale[useLocale()]
}

/** Site name/tagline for the active locale. */
export function useSite() {
  return siteByLocale[useLocale()]
}
