export default function Post({ post }) {
  return (
       <div className='team'>
      <img className="slicker" src={post.frontmatter.coee} alt='' />
<div className="nm">

      <h4>{post.frontmatter.title}</h4>

      <p className="p">{post.frontmatter.excerpt}</p>
      <div className='post-date rt'>Posted on {post.frontmatter.date}</div>      <div className='post-date rtd'>{post.frontmatter.contsent}</div>

<br/><br/>
        <a href={`/blog/${post.slug}`} className="jo">Read More</a></div>
      </div>

  )
}
