import { getBookmark } from '@/lib/actions/bookmark'
import BookmarkButton from './BookmarkButton'

export default async function BookmarkButtonWrapper({
  userId,
  bookId,
  className,
}: {
  userId: string
  bookId: number
  className?: string
}) {
  const bookmark = await getBookmark(userId, bookId)

  return (
    <BookmarkButton
      userId={userId}
      bookId={bookId}
      className={className}
      bookmark={bookmark}
    />
  )
}
