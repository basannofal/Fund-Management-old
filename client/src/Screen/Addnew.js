import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Component/Navbar'
const Addnew = () => {

  const {id} = useParams("")
  const naviget = useNavigate()

  const [mname, setmname] = useState('');
  const [mnumber, setmnumber] = useState('');

const Submit =async (e) => {
  e.preventDefault();

  const res = await fetch(`/addnew/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          mname, mnumber
      })
  })

  console.log(res);
  const data = await res.json();
  console.log(data);
  if (res.status === 400) {
      window.alert('error is already exist !!!!')
  }
  else {
      window.alert('Member Added')
      setmname('')
      setmnumber('')
  }
}


  return (
    <>
      <Navbar />
      <div className="macontainer">
        <form> 
            <legend>Add new Member in Society</legend>
            <br />
            <br />
            <div class="mb-3">
              <label  class="form-label">Enter Name</label>
              <input type="text" name='mname' class="form-control" onChange={(e) => {setmname(e.target.value)}} value={mname} placeholder="i.e : basan nofal" autoComplete='off' />
            </div>
            <div class="mb-3 mt-4">
              <label  class="form-label">Enter Name </label>
              <input type="text" class="form-control" onChange={(e) => {setmnumber(e.target.value)}} value={mnumber} name='mnumber' placeholder="i.e: 942762**84" autoComplete='off' maxLength={10}/>
            </div>

            
            { mname != '' && mnumber != ''?
              <button onClick={Submit} type="submit" class="btn btn-primary mt-3">Add New</button>
              :
              <button onClick={Submit} type="submit" class="btn btn-primary mt-3" disabled>Add New</button>
            }

        </form>
      </div>
    </>
  )
}

export default Addnew