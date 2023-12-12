import "./Header.css"
export const Header=({handleInputValue,handleAddbtn,listinputValue})=>{
    return(
        <div className="todo-header">
            <h1>Todo list</h1>
            <div>
            <input type="text" value={listinputValue} placeholder="Add list..." onChange={handleInputValue} />
            <button onClick={handleAddbtn}>ADD TODO</button>
            </div>
        </div>
    )
}