
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import { sortByDate } from '../utils'
import { getAraray } from '../getArray'
import { database,ref,set ,onValue,get,getStorage,Sref,uploadBytes,getDownloadURL,storage, listAll,list } from "../firebase"
export default function Home({ posts }) {
  const tro=getAraray()
  // console.log(tro+"tro")
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}
export async function getStaticProps() {
  function objectToArray(obj) {
    if (obj != null||undefined){
    return Object.keys(obj).map(key => obj[key]);
    }
  }
  const snapshot = await get(ref(database, 'posts'))
  if(snapshot.hasChildren()){
    console.log(true)
  }else{
    console.log(false)
  }
  const myArray =objectToArray(snapshot.val())
// let data = snapshot.val();
// console.log(data); 

    // const myArray = objectToArray(data);
    
    // const backup= [{title: 'Post 1', date: '8 October, 3005', excerpt: 'excerpt', content: 'Content of post 1'}, {title: 'Post 2', content: 'Content of post 2'}];
    // const posty = [{title: 'Post 1', date: '8 October, 3005', excerpt: 'excerpt', content: 'Content of post 1'}, {title: 'Post 2', content: 'Content of post 2'}];
  const posty=myArray
  // const posty= myArray==undefined||null ? backup : myArray
  // console.log(4444)
  // console.log(posty)
  if (posty!=null||undefined){
    posty.forEach((post) => {
      // console.log(post.title)
      // const fileName = `${post.title}.md`;
      const fileName = `${post.id}.md`;
  
      // console.log(fileName)
      const filePath = path.join(process.cwd(), 'posts', fileName);
      // console.log(filePath)
      const ee = `${post.content}`
      const words = ee.split(" "); // split the post into an array of words
      const wordCount = words.length; // count the number of words
      const readingSpeed = 200; // set the average reading speed in words per minute
      const minutes = Math.ceil(wordCount / readingSpeed); // calculate the estimated reading time in minutes
      const numm=minutes + " minute read"// output: 1 minute read
      
      // const fileContent = `# ${post.title}\n\n${post.content}`;
      // const fileContent = `---\ntitle: ${post.title}\ndate: ${post.date} 📅\n \ncover_image: ${post.cover_image}\nexcerpt: ${post.excerpt}\n---\n\n${post.content}`;
      const fileContent = `---\ntitle: ${post.title}\nid: ${post.id}\ndate: ${post.date} 📅\n \ncover_image: ${post.thumbnail}\ncoee: ${post.cover_image}\nexcerpt: ${post.excerpt}\ncontsent: ${numm}\n----\n\n${post.content}`;
  
      fs.writeFileSync(filePath, fileContent);
    })}

  // console.log(data)
 

  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })
  
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}
