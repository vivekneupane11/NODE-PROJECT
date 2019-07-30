const bcrypt = require('bcrypt');
async function getallUsers(req, res) {


    try {
        await req.db.collection("users").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json({
                data: result

            });

        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: err,
                success: false

            }
        });
    }

}

async function deleteUsers(req, res) {

    try {
        await req.db.collection("users").deleteOne(req.body.id, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send("successflllllyyyyy deleted")

        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: err,
                success: false

            }
        });
    }
}

async function updateUsers(req, res) {

    try {
        //BCRYPT PASSWORD BEFORE
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);


        let myquery = { id: req.body.id };
        let newvalues = { $set: { name: req.body.name, address: req.body.address, password: req.body.password, email: req.body.email, age: req.body.age, contact: req.body.contact, role: req.body.role, department: req.body.department } };

        await req.db.collection("users").updateOne(myquery, newvalues, function(err, ) {
            if (err) throw err;
            console.log("1 document updated");
            res.send("updated")
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: err,
                success: false

            }
        });
    }
}


module.exports = {
    getallUsers: getallUsers,
    deleteUsers: deleteUsers,
    updateUsers: updateUsers
}