const mongoose = require('mongoose')

const sahkardata = mongoose.Schema({

    sname: String,
    member : [
        {
            mstatus : Boolean,
            mname : String,
            mnumber : Number,
            studentId : Number,
            mhafta :[
                {
                    date : String,
                    price : Number,
                    status : false,
                }
            ]
        }
    ],
})

const sahkarschema = mongoose.model('sahkar', sahkardata)

module.exports = sahkarschema;