const mongoose = require('mongoose');

const url = "mongodb+srv://allinone:allinone@cluster0.naztqmy.mongodb.net/allinone?retryWrites=true&w=majority";
mongoose.connect(url,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("db connected");
}).catch((e) => {
    console.log(e);
})