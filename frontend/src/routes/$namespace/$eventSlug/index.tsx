import type { JSX } from 'react/jsx-runtime'

import { RichTextEditor } from '@/components/ui/editor/RichTextEditor'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/$namespace/$eventSlug/')({
  component: OverviewBoard
})

function OverviewBoard(): JSX.Element {
  const { t } = useTranslation('events')
  return <RichTextEditor placeholder={t('editor.placeholder')} />
}
