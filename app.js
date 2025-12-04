import express from 'express';
import users from './MOCK_DATA.json' with { type: "json" };

const app =express();
app.use(express.json());

const PORT=8000;
app.use((req,res,next)=>{
    console.log("helloi from middleware1");
    next()
})
app.use((req,res,next)=>{
    console.log("helloi from middleware2");
    return res.end("hi")
})
// ROUTES
app.get('/api/users', (req, res) => {
    return res.status(200).json(users);
});
// single user
app.get('/api/users/:id', (req, res) => {
    const id= parseInt(req.params.id);
    const user=users.find(u=> u.id=== id);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
})

app.post('/api/users', (req, res) => {
   
  const {first_name,last_name,email,gender,job_title}=req.body;
  const newUser={
    id: users.length +1,
    first_name,
    last_name,
    email,
    gender,
    job_title
  };
  const newUsers=[...users,newUser];
  return res.status(201).json(newUsers)
});

app.put('/api/users/:id', (req, res) => {
    const id= parseInt(req.params.id);
    const userIndex= users.findIndex(u=> u.id=== id);

    if(userIndex=== -1){
        return res.status(404).json({ message: 'User not found' });
    }
    const {first_name,last_name,email,gender,job_title}=req.body;
    const updatedUser={
        id,
        first_name,
        last_name,
        email,  
        gender,
        job_title,

    };
    users[userIndex]= updatedUser;

    return res.status(200).json(updatedUser);
    
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})