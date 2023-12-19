import { useEffect, useState } from "react";
import { Content } from "./Content/Content";
import { Header } from "./Header/Header";
import "./Todolist.css";

export const Todolist = () => {
  const [arrayId, setArrayId] = useState(0);
  const [mainArray, setMainArray] = useState([]);
  const [listinputValue, setListinputValue] = useState("");
  const [error,setError] = useState({
    maininput : false,
    editinput : false
  })

  ////set data to local storage
  useEffect(() => {
    if(localStorage.getItem('todo-items')){
      const storedTasks = JSON.parse(localStorage.getItem('todo-items'));
    setMainArray(storedTasks.taskarray);
    setArrayId(storedTasks.id);
    }
  }, []);

  ////get data from local storage
  useEffect(() => {
    localStorage.setItem('todo-items', JSON.stringify({
      taskarray:mainArray,
      id:arrayId
  }));
  }, [mainArray]);


  const handleInputValue = (event) => {
    setListinputValue(event.target.value);
    onBlurHandler(event);
  };

  ////To save edited value in array
  const handleSave = (editid, edittext) => {
    if (edittext) {
      const editedArray = mainArray.map((data) =>
        data.id === editid
          ? {
              ...data,
              content:
                edittext.charAt(0).toLocaleUpperCase() + edittext.slice(1),
            }
          : data
      );
      setMainArray(editedArray);
    }
  };

  ////To add new itms to list
  const handleAddbtn = () => {
    if(listinputValue){
      setMainArray((prev) => [
        ...prev,
          {
            id:arrayId,
              content: listinputValue.charAt(0).toLocaleUpperCase() +
            listinputValue.slice(1),
            status:"uncomplited",
      }
      ]);
      setArrayId(arrayId+1);
      setListinputValue("");
    }else{
      alert("Emptiy task can't save")
    }
  };

  //// To delete list item
  const handleDelet = (deletid) => {
    if (confirm("Are you sure ?")) {
      const filteredArray = mainArray.filter((data) => data.id !== deletid);
      setMainArray(filteredArray);
    }
  };

  /// to strick complited task
  const handleDone=statusid=>{
    const statusArray = mainArray.map((data)=>{

    if(data.id === statusid){
       return data.status === "uncomplited"
          ? {
              ...data,
              status:"complited"
            }
          : {
            ...data,
              status:"uncomplited"
          }
          }else{
            return data;
          }
        });
    
    setMainArray(statusArray);
    }

    const onBlurHandler =event=>{
      const errors = {
        maininput:false,
        editinput:false
      }
      const {name,value}=event.target;
      if (name === "maininput" && value==="") {
        errors.maininput = true;
      }else if(name === "editinput" && value === ""){
        errors.editinput = true;
      }
      setError(errors);
    }
  return (
    <div className="to-do-list">
      <Header handleInputValue={handleInputValue}
       handleAddbtn={handleAddbtn}
       onBlurHandler={onBlurHandler}
       error={error}
       listinputValue={listinputValue} />
      <Content
        mainArray={mainArray}
        handleDelet={handleDelet}
        handleSave={handleSave}
        handleDone={handleDone}
        onBlurHandler={onBlurHandler}
        error={error}
      />
    </div>
  );
};