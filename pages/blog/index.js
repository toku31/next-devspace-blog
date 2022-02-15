import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { sortByDate } from '../utils'


export default function BlogPage({posts}) {
  // console.log(posts)
  // console.log('posts1', posts)
  // console.log(posts.index)
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        // <h3>{post.frontmatter.title}</h3>
        ))}
      </div>

    </Layout>
  )
}

export async function getStaticProps() {
  // console.log(123)
  const files = fs.readdirSync(path.join('posts'))
  // console.log(files)
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 'utf-8'
    )

    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }

  })

  // console.log('posts-terminal', posts) // ターミナル出力

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}