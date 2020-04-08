const express = require('express');
const { check } = require('express-validator');

const meetingControllers = require('../controllers/meeting-controllers');

const router = express.Router();
router.get('/:cid', meetingControllers.getActiveMeetings);
// router.get('/allUsers', meetingControllers.getAllUsers);
router.get('/getClient/:id', meetingControllers.getClient);
module.exports = router;

//=======================================
// samples ....
//=======================================
// app.get('/getOne/:id', (res, req) => {
//     let sql = `select * from users where user_id = ${id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('User fetched');
//     });
// });

// app.get('/updateOne/:id', (res, req) => {
//     let newComment = "just a sample";
//     let sql = `UPDATE users SET comments = '${newComment}' where user_id = ${id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('User updated');
//     });
// });

// app.get('/deleteOne/:id', (res, req) => {
//     let sql = `DELETE FROM users where user_id = ${id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('User deleted');
//     });
// });