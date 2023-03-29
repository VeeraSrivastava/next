
import marked from 'marked'
import dynamic from 'next/dynamic';
import { useState ,useEffect} from 'react';
import 'firebase/database'
import { database,ref,set ,onValue,get,getStorage,Sref,uploadBytes,getDownloadURL,storage,sendSignInLinkToEmail, listAll,list,auth,isSignInWithEmailLink ,signInWithEmailLink} from '../firebase';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    // [{ size: [] }],
    // [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
function generateUUID() {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export const saveObject = async (object) => {
  const objectsRef = ref('objects')
  const newObjectRef = objectsRef.push()
  await newObjectRef.set(object)
  return newObjectRef.key
}

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://veerasrivastava-didactic-space-waffle-rwxxpp744qj3x9wq-3000.preview.app.github.dev/admin',
  // This must be true.
  handleCodeInApp: true,

};
const cruel=()=>{
 
  sendSignInLinkToEmail(auth, "devfasttt@gmail.com", actionCodeSettings)
//devfasttt
  .then(() => {
    alert("link sent")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("error1")
    console.log(errorCode)
    console.log(errorMessage)

  });

}





export default function Home({ posts }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [cover_image, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [base64String, setBase64String] = useState(null);
  const [final, setFinal] = useState(null);
  

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef=Sref(storage,"images/")

  function submitHandler(event) {
    event.preventDefault();
   
    const requestObj = {
      id: generateUUID(),
      title: title,
      date: date,
      excerpt: excerpt,
      cover_image: '',
      thumbnail: cover_image,
      content: content,
      isDraft: isDraft,
      isPublished: isPublished
    };
    
    if(imageUpload==null)return;
    const imageRef=Sref(storage, `images/${requestObj.id}`)
    console.log(imageRef)
    uploadBytes(imageRef,imageUpload).then(
      (snapshot)=>{
        alert("Uploaded successfully, do not reupload the same!")
        getDownloadURL(snapshot.ref).then(
          (url)=>{
            setImageList((prev)=>
            [...prev,url])
            console.log(imageList)
            console.log(imageUpload)
requestObj.cover_image=url
            // setFinal(url)
            console.log(url)
            //move this !if not using upload

            console.log(requestObj)
            saveObject(requestObj)
            const dataRef = ref(database, 'posts/' + requestObj.id);
            set(dataRef, requestObj);
          }
        )
      
      }
    )

   
    // Create a child reference
    // const imagesRef = Sref(getStorage(), '');
  
  }

  function handleTitleChange(event) {
    event.preventDefault();
    setTitle(event.target.value);
  }


  function handleDateChange(event) {
    event.preventDefault();
    setDate(event.target.value);
  }

  function handleExcerptChange(event) {
    event.preventDefault();
    setExcerpt(event.target.value);
  }

  function handleCoverImageChange(event) {
    event.preventDefault();
    setCoverImage(event.target.value)
 console.debug(cover_image)
  }
const handleImageLoad = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const base64 = await fileToBase64(file);
  setBase64String(base64);
  console.log(base64)

};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const dhantenan=(event)=>{
  setImageUpload(event.target.files[0])
  
   console.log("sonf")

}


useEffect(()=>{

   

if (isSignInWithEmailLink(auth, window.location.href)) {
  // let email = "devfasttt@gmail.com"
  
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, "devfasttt@gmail.com", window.location.href)
    .then((result) => {
      // Clear email from storage.
      alert("Successfully Signed in!")
      document.getElementById("mr").classList.remove("wddd")
      document.getElementById("dsdd").classList.add("wddd")

      window.localStorage.removeItem('emailForSignIn');
    })
    .catch((error) => {
      console.log(error)
      alert("error2")

    });

}





listAll(imageListRef).then((response)=>{
  console.log(response)
  response.items.forEach((item)=>{
    
    getDownloadURL(item).then(
      (url)=>{
        setImageList((prev)=>
        [...prev,url])
        // setFinal(url)
      }
    )
  })
})
},[])

  return (<>
   <button onClick={cruel} className="" id="dsdd">Authenticate</button>

    <form className='poo wddd' id='mr' onSubmit={submitHandler}>
      
      <input type="file" onChange={dhantenan}/>

<br/><br/>
      <label htmlFor="title">Title: </label>
      <input type="text" value={title} name="title" placeholder="Enter a title" onChange={handleTitleChange} required />
      <br/>      <br/>

      <label htmlFor="date">Date: </label>
      <input type="date" value={date} name="date" placeholder="Enter a date" onChange={handleDateChange} required />
      <br/>      <br/>

      <label htmlFor="excerpt">Excerpt: </label>
      <input type="text" value={excerpt} name="excerpt" placeholder="Enter an excerpt" onChange={handleExcerptChange} required />
      <br/>      <br/>
    
{/* link onplzzz
      <label htmlFor="cover_image">cover_image: </label>
      <input type="url" value={cover_image} name="cover_image" placeholder="Enter a cover_image" onChange={handleCoverImageChange}/>
      <img src={cover_image}/>
      <br/>      <br/> */}


      {/* <label htmlFor="base64String">Cover Image: </label> */}
     
{/* 
      <br/><br/>

      <input type="file" 
       multiple accept="image/*"  onChange={handleImageLoad} /> */}
      <br/><br/>      <br/>


 {/* <input type="file" value={cover_image} multiple accept="image/*" name="cover_image" placeholder="Enter a title" onChange={handleCoverImageChange} required /> */}
      {/* <input type="textarea" value={cover_image}  onChange={handleCoverImageChange}  /> */}


      {/* {base64String && <img className='boo' src={base64String} alt="Uploaded image" />} */}
      
      <QuillNoSSRWrapper modules={modules} onChange={setContent} theme="snow" />
      <button>Save</button><br /><br />
      {/* {imageList.map((url)=>{
        return <img src={url} />
      })} */}
      <article dangerouslySetInnerHTML={{ __html: marked(content) }}></article>
   
    </form>

  </>)

}
