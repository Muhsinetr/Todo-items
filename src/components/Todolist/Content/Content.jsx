import { useState } from "react";
import "./Content.css"
export const Content =({mainArray,handleDelet,handleSave,handleDone})=>{
    const [showorhide, setShoworhide] = useState("");
    const [editValue,setEditValue] = useState("")

    ////To show edit area
    const handleEditarea =(showid)=>{
        setShoworhide(showorhide===showid?"":showid);
      }

      const handleEditvalue=(event)=>{
        setEditValue(event.target.value);
      }
    return(
        <div className="content-div">
            {mainArray.map((data)=>(
                <div key={data.id}>
                <div className="content-area">
                <p 
                onDoubleClick={()=>handleDone(data.id)}
                style={data.status === 'complited'?{textDecoration:'line-through'}:{textDecoration:'none'} }
                title="doubleclick to complite"
                >{data.content}</p>
                <div className="icon-container">
                <div onClick={()=>handleEditarea(data.id)} title="Edit item" className="edit"></div>
                <div className="delete" onClick={()=>handleDelet(data.id)} title="Delete item"></div>
                </div>
            </div>
            {data.id===showorhide && (
                <div className="edit-area">
                <input type="text" onChange={handleEditvalue} placeholder="Edit current item..."/>
                <button onClick={()=>{handleSave(data.id,editValue);setEditValue("");setShoworhide("")}}>SAVE</button>
                <button className="edit-btn" onClick={()=>setShoworhide("")}>CANCEL</button>
            </div>
            )}
                </div>
            ))}
        </div>
    )
}