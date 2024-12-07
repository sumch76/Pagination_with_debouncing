const express=require('express');
const User=require('../models/user.model');
const { faker } = require('@faker-js/faker');

const router=express.Router();

router.get('/seed',async(req,res)=>
{
    try{
        const users=[];
        for(let i=0;i<10000;i++)
        {
            users.push({
                name:faker.person.fullName(),
                email:faker.internet.email(),
                phone:faker.phone.number(),
            })
        }
        await User.insertMany(users);
        res.send('database seeded with 10,000 users!!')

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.get('/',async(req,res)=>
{
    try {
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      users,
      page,
      pages: Math.ceil(total / limit),
    });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('An error occurred while fetching users.');
        
    }
});

module.exports=router;
