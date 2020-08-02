const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../data');


router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: "member not found" });
    }
});

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email || 'None'
    }
    if (!newMember.name) {
        return res.status(400).json({ msg: 'please include name' })
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
            }
            res.json({ msg: "member Updated" });;
        });
    } else {
        res.status(400).json({ msg: "member not found" });
    }
});


//delete
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: "member not found" });
    }
});


module.exports = router;