import * as React from 'react'
import { FileRoute, Link } from '@tanstack/react-router'
import { PostErrorComponent } from './posts.$postId'
import { postQueryOptions } from '../postQueryOptions'
import { fetchPost } from '../posts'

// 'posts/$postId' is automatically inserted and managed
// by the `tsr generate/watch` CLI command
export const Route = new FileRoute('/posts_/$postId/deep').createRoute({
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId)),
  errorComponent: PostErrorComponent as any,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="p-2 space-y-2">
      <Link
        to="/posts"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
