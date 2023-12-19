import "./Header.css"
export const Header=({handleInputValue,handleAddbtn,listinputValue,onBlurHandler,error})=>{
    return(
        <div>
        <div className="todo-header">
            <h1>Todo list</h1>
            <div>
            <input type="text" name="maininput" value={listinputValue} placeholder="Add list..." onChange={handleInputValue} onBlur={onBlurHandler} />
            <button onClick={handleAddbtn}>ADD TODO</button>
            </div>
        </div>
        {error.maininput === true && <p className="danger-input">input feild required</p>}
        </div>
    )
}