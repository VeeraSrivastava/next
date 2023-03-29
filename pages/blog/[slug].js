
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'

export default function PostPage({
  frontmatter: { title,  coee,excerpt,date,contsent },
  slug,
  content,
}) {
  return (
    <div className='container-fixed-width'>
      <Link href='/'>
        <a className='jeo'>Go Back</a>
      </Link>
   

        {/* <div className='long'>{title}</div>
        <div className='aitt'>
        <img src={coee}  alt='' />
        </div>
        <div className='ssd'>{excerpt}</div>
     <div class="fee">   <div className='post-date rt'>Posted on {date}</div>      <div className='post-date rtd'>{contsent}</div></div> */}
        <img src={coee}  alt='' />

<div className='ldd'>{title}</div>

<div class="fee">   <div className='post-date rt'>Posted on {date}</div>      <div className='post-date rtd dawn'>{contsent}</div></div>





      <div className='mdd' dangerouslySetInnerHTML={{ __html: marked(content) }}></div>

    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
