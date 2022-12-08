const express = require('express');
var path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}));

app.use(express.static(path.resolve(__dirname,'./client/angular-app/dist/angular-app')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(path.resolve(__dirname, './client/angular-app/dist/angular-app/index.html')));
// });

app.get('/list', function (req, res) {
  res.sendFile(path.join(path.resolve(__dirname, './client/angular-app/dist/angular-app/index.html')));
});
app.get('/details', function (req, res) {
  res.sendFile(path.join(path.resolve(__dirname, './client/angular-app/dist/angular-app/index.html')));
});

const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob@gmail.com',
    status: 'inactive'
  },
  {
    id: 3,
    name: 'Shannon Jackson',
    email: 'shannon@gmail.com',
    status: 'active'
  }
];

app.get('/api/list',(req,res) => {
  res.json(members);
});

// Get Single Item
const idFilter = req => member => member.id === parseInt(req.params.id);
app.get('/api/list/:id', (req, res) => {
    console.log(req.params.id);
    const found = members.some(member => member.id == req.params.id);
    if(found){
        res.json(members.filter(member => member.id == req.params.id)); 
    }
    else{
        res.json('Not Found');
    }    
  });

app.listen(port,()=>{
    console.log('app started',port);
})