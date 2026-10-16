const express = require('express')
const router = express.Router()

const Note = require('../models/Note')
const protect = require('../middleware/authMiddleware')


router.post('/', protect, async(req, res)=>{
    try{
        const {title, content} = req.body
        const newNote = await Note.create({
            title: title,
            content: content,
            user: req.user.id
        })
        res.json(newNote)
    }catch(err){
        res.json({message: err.message})
    }
})


router.get('/',protect, async(req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    }catch(err){
        res.json({message: err.message})
    }
})

router.delete('/:id', protect, async(req, res)=>{
    try{
        const deletednote = await Note.findOneAndDelete({_id: req.params.id, user: req.user.id})
        if(!deletednote){
            return res.json("note not found")
        }
        res.json("note deleted successfully")
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router
