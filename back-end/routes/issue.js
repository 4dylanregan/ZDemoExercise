const express = require('express');
const router = express.Router();
const issueData = require('../data/issue');
const xss = require('xss');

router.get('/issue', async (req, res) =>{
    try{
        const issueList = await issueData.getAll();
        res.json(issueList);
    }
    catch(e){
        res.status(400).json({ error: 'no issues found' });
    }
});

router.get('/issue/:id', async (req,res) =>{
    let issueId = xss(req.params.id);

    //Error Handling
    if(!issueId){
        res.status(400).json({error: 'no issue Id provided'})
    }
    if(typeof(issueId) !== 'string'){
        res.status(400).json({error: 'issue Id must be a string'})
    }
    if(issueId.trim().length ===0){
        res.status(400).json({error: 'issue Id cannot be an empty string'})
    }

    try{
        const search = await issueData.getById(issueId);
        res.json(search);
    }
    catch(e){
        res.status(400).json({ error: e });
    }

});

router.post('/issue', async (req,res) =>{

    let name = xss(req.body?.name);
    let email = xss(req.body?.email);
    let description = xss(req.body?.description);

    //TODO Change Error Handling into a function to be reused
    //Error Handling on Name
    if(!name){
        res.status(400).json({error: 'name is not provided'})
        return
    }
    if(typeof(name) !== 'string'){
        res.status(400).json({error: 'name must be a string'})
        return
    }
    if(name.trim(' ').length === 0){
        res.status(400).json({error: 'name cannot be an empty string'})
        return
    }
    
    //Error Handling on Email
    if(!email){
        res.status(400).json({error: 'email is not provided'})
        return
    }
    if(typeof(email) !== 'string'){
        res.status(400).json({error: 'email must be a string'})
        return
    }
    if(email.trim(' ').length === 0){
        res.status(400).json({error: 'email cannot be an empty string'})
        return
    }

    //Error Handling on Description
    if(!description){
        res.status(400).json({error: 'description is not provided'})
        return
    }
    if(typeof(description) !== 'string'){
        res.status(400).json({error: 'description must be a string'})
        return
    }
    if(description.trim(' ').length === 0){
        res.status(400).json({error: 'description cannot be an empty string'})
        return
    }

    try{
        const createIssue = await issueData.createIssue(name, email, description);
        res.status(201).json(createIssue);
    }
    catch(e){
        res.status(400).json({ error: e });
    }
});

router.patch('/issue/:id', async (req,res) =>{
    let issueId = xss(req.params.id);
    let status = xss(req.body?.status);
    //Error Handling
    if(!issueId){
        res.status(400).json({error: 'no issue Id provided'})
    }
    if(typeof(issueId) !== 'string'){
        res.status(400).json({error: 'issue Id must be a string'})
    }
    if(issueId.trim().length ===0){
        res.status(400).json({error: 'issue Id cannot be an empty string'})
    }

    if(!status){
        res.status(400).json({error: 'no status provided'})
    }
    if(typeof(status) !== 'string'){
        res.status(400).json({error: 'status must be a string'})
    }
    if(status != 'new' && status != 'in progress' && status != 'resolved'){
        res.status(400).json({error: 'status must be new, in progress or resolved'})
    }

    try{
        const updateIssue = await issueData.updateIssue(issueId, status);
        res.json(updateIssue);
    } catch(e){
        res.status(400).json({ error: e });
    }
});

module.exports = router;