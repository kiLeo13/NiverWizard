import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'
import type { PlaylistResponse } from '@/api/schemas/event'

import { FiBox } from 'react-icons/fi'
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import { SidebarActionItem } from './SidebarActionItem'
import { FaLocationDot } from 'react-icons/fa6'
import { FaDeezer } from 'react-icons/fa'
import { BsAppleMusic } from 'react-icons/bs'
import { FaSpotify } from 'react-icons/fa'
import { RiPlayList2Fill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { eventQueries } from '@/api/services/event'

import styles from './Sidebar.module.css'

export function Sidebar(): JSX.Element {
  const { namespace, eventSlug } = useParams({ strict: false })
  const { t } = useTranslation('events')

  const { data: eventData } = useQuery({
    ...eventQueries.detail(namespace!, eventSlug!),
    enabled: !!(namespace && eventSlug)
  })

  return (
    <aside className={styles.container}>
      <div className={styles.details}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t('sidebar.details.title')}</h2>
        </header>
        <div className={styles.contents}></div>
      </div>

      <div className={styles.actions}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t('sidebar.actions.title')}</h2>
        </header>
        <div className={styles.interactions}>
          <SidebarActionItem icon={<FiBox />} label={t('sidebar.actions.overview')} />

          <SidebarActionItem
            icon={<MdOutlinePhotoLibrary />}
            label={t('sidebar.actions.gallery')}
          />

          <SidebarActionItem icon={<FaLocationDot />} label={t('sidebar.actions.location')} />

          <SidebarActionItem
            icon={getPlaylistProviderIcon(eventData?.playlist)}
            label={t('sidebar.actions.playlist')}
          />
        </div>
      </div>
    </aside>
  )
}

// Returns an icon matching the provider (by react-icon), or a generic one if `pl` is null.
function getPlaylistProviderIcon(pl: PlaylistResponse | undefined | null): ReactNode {
  if (!pl) return <RiPlayList2Fill />

  switch (pl.provider) {
    case 'applemusic':
      return <BsAppleMusic />
    case 'deezer':
      return <FaDeezer />
    case 'spotify':
      return <FaSpotify />
    default:
      return <RiPlayList2Fill />
  }
}
