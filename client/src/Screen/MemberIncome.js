import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../Component/Navbar'





const MemberIncome = () => {


  const { id, mid } = useParams("")
  const [savedata, setsavedata] = useState([]);
  const [income, setincome] = useState([]);


  let tempvar = [];
  const Getdata = async () => {


    try {

      const res = await fetch(`/getuser/${id}/${mid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const data = await res.json();
      if (!data) {
        window.alert('error in get data')
      }
      else {
        setsavedata(data[0].member[0])
        setincome(data[0].member[0].mhafta)
        console.log(data[0].member[0].mhafta);
      }

    } catch (e) {
      window.alert("Something Went Wrong")
      console.log(e);
    }
  }

  useEffect(() => {
    Getdata()
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="row ne">
          <div className="col-lg-2 memtogle" >
            <NavLink to={`/memberdetail/${id}/${mid}`}>

              <div class="alert alert-primary rounded-0 border-primary mb-0" role="alert">
                <center className='text-black '>Member Detail</center>
              </div>
            </NavLink>

            <NavLink to={`/membericome/${id}/${mid}`}>

              <div class="alert alert-primary rounded-0 border-primary mb-0" role="alert">
                <center className='text-black '>Total Income</center>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-10 p-3">

            <table class="table table-striped border">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col ">Date</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>


                {
                  income.map((e, i) => {
                    return (
                      <>
                        <tr>
                          <td scope="row">{i+1}</td>
                          <td>{e.date}</td>
                          <td>{e.price}</td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>






    </>

  )
}

export default MemberIncome