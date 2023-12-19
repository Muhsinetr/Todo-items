import { useState } from "react";
import "./Content.css"
export const Content =({mainArray,handleDelet,handleSave,handleDone,error,onBlurHandler})=>{
    const [showorhide, setShoworhide] = useState("");
    const [editValue,setEditValue] = useState("");

    ////To show edit area
    const handleEditarea =(showid)=>{
        setShoworhide(showorhide===showid?"":showid);
      }
      const handleEditvalue=(event)=>{
        setEditValue(event.target.value);
        onBlurHandler(event);
      }
    return(
        <div className="content-div">
            {mainArray.map((data)=>(
                <div className="content-items" key={data.id}>
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
                <div >
                <div className="edit-area">
                <input type="text" onChange={handleEditvalue} onBlur={onBlurHandler} name="editinput" placeholder="Edit current item..."/>
                <button onClick={()=>{handleSave(data.id,editValue);setEditValue("");setShoworhide("")}}>SAVE</button>
                <button className="edit-btn" onClick={()=>setShoworhide("")}>CANCEL</button>
            </div>
            {error.editinput === true && <h6 className="danger">input feild required</h6>}
            </div>
            )}
                </div>
            ))}
        </div>
    )
}