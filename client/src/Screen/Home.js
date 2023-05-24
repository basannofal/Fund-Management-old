import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../Component/Navbar'

const Home = () => {

  const [savedata, setsavedata] = useState([]);
  const [dvalue, setdvalue] = useState(210);
  const [temp, setTemp] = useState([]);

  const [serachval, setSerachval] = useState('');
  const [price, setprice] = useState(0);
  const [hafta, sethafta] = useState(0);
  const [arr, setarr] = useState([]);

  const id = "63b56ddd981b119c3275f509"

  const Getdata = async () => {
    const res = await fetch(`/getdata/${id}`, {
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
      let newdata = data.member;

      setsavedata(newdata)
      setTemp(newdata)

    }
  }

  const Pay = async (e) => {

    try {
      const obid = e;
      const res = await fetch(`/addhafta/${id}/${obid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dvalue
        })
      })

      const data2 = await res.json();
      console.log(data2);
      if (!data2) {
        window.alert('error in get data2');
      }
      else {

        setsavedata(data2.member)
        if (dvalue === 210) {

        }
        else {
          setdvalue(210)
        }
        Getdata()

      }


    } catch (e) {
      console.log(e);
      window.alert(e)
    }
  }

  const Reset = async () => {

    var x = window.confirm("Are you sure for Reset All Data")
    if (x) {
      Resetdata()
    }
    else {

    }

  }

  const Resetdata = async () => {
    try {

      const res = await fetch(`/reset/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dvalue
        })
      })

      const data2 = await res.json();
      console.log(data2);
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        Getdata()
      }


    } catch (e) {
      console.log(e);
      window.alert(e)
    }

  }

  let pr = 0;
  let ht = 0;


  const filterBySearch = (event) => {
    // // Access input value
    // const query = event.target.value;
    // // Create copy of item list
    // var updatedList = [...userdata];
    // // Include all elements which includes the search query
    // updatedList = updatedList.filter((item) => {
    //   return item.schemename.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    // });
    // console.log(updatedList);
    // // Trigger render with updated values
    // if (updatedList.length !== 0) {
    //   setuserdata(updatedList);
    // } else {
    //   setuserdata(temp)
    // }

    setSerachval(event.target.value)
    const keyword = event.target.value;

    const results = temp.filter((user, i) => {
      console.log(i);
      if(i+1 == keyword){
        console.log("right");
      }
      return( user.mname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
      i+1 == keyword );
      // Use the toLowerCase() method to make it case-insensitive
    });
    if (results !== '') {
      setsavedata(results);
    } 
    else{
      setsavedata(temp)
    }
  };


  useEffect(() => {
    Getdata()
  }, []);
  return (
    <>
      <Navbar />


      <h3 className='text-center' style={{ margin: 30, fontWeight: "bold", fontFamily: "sans-serif" }}>Sahkar Society</h3>
      <div class="row" style={{ marginRight: 20 }}>


        <div className='d-flex px-5 mb-3' style={{ justifyContent: "space-between" }}>
          <button className='btn btn-primary' onClick={Reset}>Reset</button>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={filterBySearch} value={serachval} />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        {
          savedata.map((e, i) => {
            pr = 0
            ht = 0
            return (
              <>

                <div class="col-sm-12 col-lg-4">
                  <div class="card" style={{ width: "100%", grid: "none" }}>
                    <div class="card-body" >
                      <h5 class="card-title col-lg-12">{e.mname}</h5>
                      <div className="row mt-4">
                        <div className="col-lg-6">
                          {
                            e.mhafta.map((e, i) => {
                              pr = pr + e.price
                              ht = i+1
                            })
                          }
                          <h6>Jama : - <span>{pr}</span> </h6>
                          {/* <h6>Udhar : - <span>2000</span></h6> */}
                          <h6>Total Hafta : - <span>{ht}</span></h6>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                          {
                            e.mstatus != true ?
                              <div className="row">

                                <input className="col-lg-6" style={{ borderRadius: 5 }} type="text" name='price' onChange={(e) => { setdvalue(e.target.value) }} value={dvalue} />

                                <button className='btn btn-outline-success col-lg-6' onClick={() => { Pay(e._id); window.alert(`${e.mname} is ${dvalue} paid`) }} >pay</button>
                              </div> :
                              <div className="row">
                                <div className="col-lg-6"></div>
                                <button className='btn btn-success col-lg-6' disabled>paid</button>

                              </div>
                          }


                          <NavLink to={`/memberdetail/${id}/${e._id}`} >

                            <div className="row">
                              <div className="col-lg-6"></div>

                              <button className='btn btn-outline-primary col-lg-6 mt-3' >Detail</button>
                            </div>

                          </NavLink>
                        </div>
                      </div>

                      <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 20 }}>
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }



        {/* <div class="col-sm-12 col-lg-4">
          <div class="card" style={{ width: "100%", grid: "none" }}>
            <div class="card-body" >
              <h5 class="card-title col-lg-12">Maknojiya Lukman Usman</h5>
              <div className="row mt-4">
                <div className="col-lg-6">
                  <h6>Jama : - <span>40000</span> </h6>
                  <h6>Udhar : - <span>2000</span></h6>
                  <h6>Total Hafta : - <span>39</span></h6>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="row">

                    <input className="col-lg-6" style={{ borderRadius: 5 }} type="text" name='price' defaultValue={210} />

                    <button className='btn btn-outline-success col-lg-6' >pay</button>
                  </div>

                  <div className="row">
                    <div className="col-lg-6"></div>
                    <button className='btn btn-outline-primary col-lg-6 mt-3' >Detail</button>
                  </div>

                </div>
              </div>

              <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 20 }}>
                1
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Home