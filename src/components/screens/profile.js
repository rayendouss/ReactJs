import React, { useEffect , useState, useContext} from 'react';
import {userContext, UserContext} from '../../App'
const Profile = ( ) =>{
  const [data,setData] = useState([])
  const {state,dispatch}=useContext(UserContext)
  const[image,setImage]= useState("")
  const[url,setUrl]= useState("")
  console.log('aaaaaaaa',state)
  useEffect(()=>{
       fetch('/mypost',{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      }

       }).then(res=>res.json())
       .then(result=>{
             console.log(result)
             console.log("a",data)
             setData(result.myposts)
             console.log("b",data)
       })
  },[])
  useEffect(()=>{
    if (image){
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset","insta-upload")
      data.append("cloud_name","mernrayen")
      fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
           method:"post",
           body:data
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
    
     
        dispatch({type:"UPDATEPIC",payload:data.url})
        fetch('/updatepic',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
           photo:data.url
          })
      }).then(res=>res.json())
    }).then(result=>{
      console.log(result)
      localStorage.setItem("user",JSON.stringify({
        ...state,
        photo:data.url
      }))
    })
      .catch(err=>{
        console.log(err)
      })
    }
  })
  const updatePhoto = (file)=>{
   setImage(file)
  }
    return(
        <div>
        <div style={{
            display:"flex",
            justifyContentContent: "space-around",
            margin:"50px 30px",
            borderBottom:"1px solid grey"
        }}>
          
        
            <div>
                <img style={{width:"160px" ,height:"160px",borderRadius:"80px"}}
                src={state?state.photo:"loading"}
                />
    
    <div className="file-field input-field">
      <div className="btn">
        <span>Update Image</span>
        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>


            </div>
            <div style={{margin:"0px 100px"}}>
              <h4>{state.name}</h4>  
              <div style={{
            display:"flex",
            justifyContentContent: "space-between",
            width:"148%",
          whiteSpace:"pre"
        }}>
            <h6>{data.length} Posts    </h6>
            <h6>{state.followers.length} Followers    </h6>
            <h6>{state.following.length} following </h6>

              </div>
            </div>
        </div>
  
  <div className="gallery">
    {
      data.map(item=>{
        return(
          <img className="item" src={item.photo} />
        )
      })
    }
     

  </div>
    </div>
    )
}

export default Profile 