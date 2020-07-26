const mongoose= require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect('mongodb://localhost/CSV');

const db=mongoose.connection;

 db.on('error', console.error.bind(console,"Error while connecting"));

 db.once('open', ()=>{
     console.log("Connected to the database");
 });

 module.exports=db;