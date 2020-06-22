import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import { useHistory , Link} from 'react-router-dom'
import M from 'materialize-css'
const Postsmyfollow = ( ) =>{
    console.log("saleeeeeeeem")
    const history=useHistory()
      const [data,setData] = useState([])
      const {state,dispatch} = useContext(UserContext)
      useEffect(()=>{
          fetch("/postsmyfollow",{
              headers:{
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              }
          }).then(res=>res.json())
          .then(result=>{
              console.log("saleeeeeeeem")
                console.log(result.posts)
              setData(result.posts)
          })
      },[])

const likePost = (id) =>{
    fetch('/like',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId : id
        })
    }).then(res=>res.json())
    .then(result=>{
       const newData =data.map(item=>{
           if(item._id==result._id)
           {
               return result 
           }else{
               return item
           }
       })
       setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

const unlikePost = (id) =>{
    fetch('/unlike',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId : id
        })
    }).then(res=>res.json())
    .then(result=>{
        const newData =data.map(item=>{
            if(item._id==result._id)
            {
                return result 
            }else{
                return item
            }
        })
        setData(newData)
       
    }).catch(err=>{
        console.log(err)
    })
}

const makeComment = (text ,id) =>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId : id ,
            text :text
        })
    }).then(res=>res.json())
    .then(result=>{
        const newData =data.map(item=>{
            if(item._id==result._id)
            {
                return result 
            }else{
                return item
            }
        })
        setData(newData)
       
    }).catch(err=>{
        console.log(err)
    })
}

const deletepost= (postid) =>{
    fetch(`/deletePost/${postid}`,{
        method:"delete",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
       
    }).then(res=>res.json())
    .then(result=>{
     const newData = data.filter(item=>{
         return item._id !== result._id
     })
     setData(newData)
    })
}

    return(
      
        <div className="home">
        {
              data.map(item=>{
                    return(
<div className="card home-card" key={item._id}>
                    <h5>  <Link to={item.postedBy._id !== state._id ? "/user/"+item.postedBy._id: "/profile"}>{item.postedBy.name}</Link>  {item.postedBy._id==state._id &&   <i className="material-icons" style={{float:"right"}}
                    onClick={()=>deletepost(item._id)}
                    >delete</i>}</h5>
              
                <div className="card-image">
                      <img src={item.photo}/>
                </div>
                <div className="card-content input-field ">
                <i className="material-icons "style={{color:"red"}}>favorite</i>
            {item.likes.includes(state._id)
            ?
                <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>
                     thumb_down</i>
              :
                <i className="material-icons" onClick={()=>{likePost(item._id)}
                }> thumb_up</i>
            }
                <h6>{item.likes.length} likes</h6>
                      <h6>{item.title}</h6>
                      <p>{item.body}</p>
                      {
                          item.comments.map(record=>{
                              return (
                                  <h6><span style={{fontWeight:"500"}}>{record.postedBy.name} </span> {record.text}</h6>
                              )
                          })
                          }
                      <form onSubmit={(e)=>{
                          e.preventDefault()

                          makeComment(e.target[0].value,item._id)
                      }}>
                      <input type="text" placeholder="Add a comment"/>
                      </form>
                </div>

            </div>
                    )
              })
        }
           
                

               

            </div>

         

   
    )
}

export default Postsmyfollow 