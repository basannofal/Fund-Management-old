import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../Component/Navbar'


const Memberdetail = () => {
  const { id, mid } = useParams("")
  const [savedata, setsavedata] = useState([]);
  const [temp, settemp] = useState([]);
  const [price, setprice] = useState(0);
  const [hafta, sethafta] = useState(0);


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
        let pr = 0;
        setsavedata(data[0].member[0])
        settemp(data[0].member[0].mhafta)
        tempvar = data[0].member[0].mhafta
        tempvar.map((e, i ) => {
          sethafta(i + 1);
          pr = pr + e.price
        })
        setprice(pr);
      }

    } catch (e) {
      window.alert("Something Went Wrong")
      console.log(e);
    }
  }

  const Delete = ( ) => {
    window.alert("Deleted")
  }


  useEffect(() => {
    Getdata()
  }, []);


  return (
    <>
      <Navbar />
      <div>
        <div className="row ne">
          <div className="col-lg-2 memtogle">
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
            <h2 className='text-center'>{savedata.mname} Information</h2>
            <hr />
            <br />
            <br />

            <div class="card" style={{width:"90%", margin:"auto", display:"block"}}>
              <h5 class="card-header " style={{height:40,}}>{savedata.mname}</h5>
              <div class="card-body mt-4 p-0">
                <h5 class="card-title"><b>Total Hafta : - </b> {hafta} </h5>
                <h5 class="card-title"><b>Total Price : - </b> {price} </h5>
                {/* <h5 class="card-title"><b>Total D : -</b>  </h5> */}

                <a href="#" class="btn btn-danger mt-3" onClick={Delete}>Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>






    </>
  )
}

export default Memberdetail