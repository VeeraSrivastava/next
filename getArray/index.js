import 'firebase/database'
import { database,ref,set ,onValue } from '../firebase';

export const getAraray=()=>{onValue(ref(database, "posts"), (snapshot) => {      
    let poos = snapshot.val()
    // console.log(poos)
   return(poos)
  }
  )
}
  
