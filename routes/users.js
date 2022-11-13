const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    try{
        const users = await User.find({});
        const count = await User.count()
        res.json({ count: count, users:users})

    } catch (err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const user = await User.findById({ _id : id});
        if(!user){
            res.status(500).json({message: 'data not found'})
        }

        res.status(200).json({user})
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    let { name, password} = req.body
    try{
        const user = new User({
            name: name,
            password: password
        })
        const newUser = await user.save()
        res.status(201).json(newUser)

    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.patch('/:id', async (req, res) => {
    let { id } = req.params;
    let { name, password } = req.body
    try{
        const userUpdate = { }
        userUpdate.name = name
        userUpdate.password = password
        
        const updated = await User.findByIdAndUpdate( id , userUpdate);
        if(!updated){
            res.status(500).json({message: 'user not found'})
        }
        res.status(201).json({message: 'user updated successfully'})

    } catch (err){
        res.status(500).json({message: err.message})
    }

})

router.delete('/:id',async (req, res) => {
    let { id } = req.params;
    try{
        
        const updated = await User.findByIdAndRemove({ _id: id });
        if(!updated){
            res.status(500).json({message: 'user not found'})
        }
        res.status(201).json({message: 'user deleted successfully'})

    } catch (err){
        res.status(500).json({message: err.message})
    }

})






module.exports = router