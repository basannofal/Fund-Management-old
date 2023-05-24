const express = require('express');
const app = express();
const conn = require('./db/conn')
const bodyparser = require('body-parser');
const path = require('path')
const getschema = require('./db/schema')
// const getschema  = require('./db/schema')


app.use(express.json())


app.use(express.static(__dirname + '/server/uploads'));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.get('/getdata', async (req, res) => {
    try {
        const userdata = await getschema.find();
        res.status(201).json(userdata);
    } catch (error) {
        res.send(error)
    }

})



// ************************** GET DATA FOR PERTICULER USER ********************************


app.get('/getdata/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const peruserdata = await getschema.findById(id);
        console.log(peruserdata);
        res.status(201).json(peruserdata);
    } catch (error) {
        res.send(error)
    }

})




// ************************** GET DATA FOR PERTICULER MEMBER  ********************************


app.get('/getuser/:id/:obid', async (req, res) => {
    try {
        const id = req.params.id
        const obid = req.params.obid
        console.log(id);
        const peruserdata = await getschema.find({ 'member._id': obid },
            { "_id": obid, member: { $elemMatch: { _id: obid } } });
        res.status(201).json(peruserdata);
    } catch (error) {
        res.send(error)
    }

})




app.patch('/addnew/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

    // var date_ob = new Date();
    // var day = ("0" + date_ob.getDate()).slice(-2);
    // var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // var year = date_ob.getFullYear();


    // var date = year + "/" + month + "/" + day;
    getschema.findByIdAndUpdate(id, {
        $push: {
            member:
            {
                mname: req.body.mname,
                mnumber: req.body.mnumber,
                mstatus : false,
            },

        }

    })
        .then(data => {
            console.log(data);
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})








// ********************************* ADD Hafta  *******************************


app.patch('/addhafta/:id/:obid', async (req, res) => {


    const _id = req.params.id;
    const obid = req.params.obid
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    hello(_id, obid)

    var date = year + "-" + month + "-" + day;

    getschema.findOneAndUpdate({ "_id": _id, "member._id": obid }, {
        $push: {
            "member.$.mhafta":
            {

                price : req.body.dvalue,    
                date : date,
                status : true
            },
        }
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})


const hello = async(id, obid) => {
    
    try {





        
        const updateuser = await getschema.updateOne(
            {
              
            
                        "member._id":obid
                
            },
            { "$set": { 
                "member.$[outer].mstatus": true,
                } 
            },
            { "arrayFilters": [
                { "outer._id": obid }
                ] 
            },).then(data => {
                if (!data) {
                    console.log('something went wrong');
                } else {                    
                    console.log("Profile Update success");
                }
            }).catch(err => {
                console.log(err);
            })
    } catch (error) {
        res.send(error)
    }
}





//************************************ Reset Status ********************************* */






app.patch('/reset/:id', async (req, res) => {

    const _id = req.params.id;
    getschema.updateMany({ "_id": _id }, {
        "$set": { 
            "member.$[].mstatus": false,
            } 
    })
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
            console.log(err);
        })
})

app.listen(8000, () => {
    console.log("Server Created");
} )