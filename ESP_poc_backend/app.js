const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.user_id == req.params.id);
    if (user) res.json(user);
    else res.status(404).send('User not found');
});

app.post('/users', (req, res) => {
    const user = {
        user_id: users.length + 1,
        username: req.body.username,
        email_address: req.body.email_address,
        password: req.body.password,
        profile_info: req.body.profile_info,
        history_loans_borrowings: req.body.history_loans_borrowings,
        refs_listings_loan_proposals: req.body.refs_listings_loan_proposals
    };
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.user_id == req.params.id);
    if (user) {
        user.username = req.body.username;
        user.email_address = req.body.email_address;
        user.password = req.body.password;
        user.profile_info = req.body.profile_info;
        user.history_loans_borrowings = req.body.history_loans_borrowings;
        user.refs_listings_loan_proposals = req.body.refs_listings_loan_proposals;
        res.json(user);
    } else res.status(404).send('User not found');
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.user_id == req.params.id);
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else res.status(404).send('User not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
