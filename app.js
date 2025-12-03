import express from 'express';

const app = express();
app.get('/about',(req,res)=>{
    console.log(req.query);
    
    return res.send('hello world',req.query);
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})