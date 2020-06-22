import React, { useEffect , useState, useContext} from 'react';
import { UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile = ( ) =>{
  const [data,setdata] = useState([])
  const [dataa,setdataa] = useState([])
  const [showfollower,setshowfollower] = useState(true)
  const [fol,setfol] = useState([])
  const [folli,setfolli] = useState([])
  const [foll,setfoll] = useState([])
  const {state,dispatch}=useContext(UserContext)
  const {userid} =useParams()
  
  
  useEffect(()=>{
    console.log("aaaid",userid)
       fetch(`/user/${userid}`,{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      }

       }).then(res=>res.json())
       .then(resulte=>{
        console.log("aaaid",userid)
         console.log('ab',data)
             console.log('bbbbrrrr',resulte)
            setdata(resulte.user)
            setfol(resulte.user.followers)
            setfolli(resulte.user.following)
            setdataa(resulte.posts)
             console.log('bb',data)
             console.log('cc',fol)
             console.log('dd',folli)
            
             setfoll(localStorage.getItem("user"))
             console.log('ee',foll)
          
       })
  },[])

  const followUser = ()=>{
   
          fetch('/follow',{
            method:"put",
            headers:{
              
                "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
              
          },
          body:JSON.stringify({
            followId : userid
        })
      })
        .then(res=>res.json())
        .then(result=>{
        console.log(result)
        dispatch({type:"UPDATE",payload:{following: result.following,
        followers:result.followers}})
        localStorage.setItem("user",JSON.stringify(result))
        setdata((prevState)=>{
          window.location.reload();
          return{
            ...prevState,
           
            user: {
              ...prevState.user,
              followers:[result.followers,result._id]
            }
          }
      
        })
        setshowfollower(false)
        })
    
           
  }

  const unfollowUser = ()=>{
   
    fetch('/unfollow',{
      method:"put",
      headers:{
        
          "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
        
    },
    body:JSON.stringify({
      followId : userid
  })
})
  .then(res=>res.json())
  .then(result=>{
  console.log(result)
  window.location.reload();
  setshowfollower(true)
  })
 
     
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
                src={data.photo}
                />
            </div>
            <div style={{margin:"0px 100px"}}>

              <h4>{data.name}</h4>  
              <h4>{data.email}</h4>  
               
               
              
                  <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>{unfollowUser()}
                }> unFollow</button>
                  

                  <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>{followUser()}
                  }> Follow</button>
              
           



              <div style={{
            display:"flex",
            justifyContentContent: "space-between",
            width:"148%",
          whiteSpace:"pre"
        }}>
            <h6>{dataa.length} Posts    </h6>
            <h6>{fol.length} followers    </h6>
            <h6>{folli.length} following   </h6>
              </div>
            </div>
        </div>
  
  <div className="gallery">
    {
     dataa.map(item=>{
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