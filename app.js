const express = require("express");
const Student = require('./models/Student')
const cors = require('cors');

const { connectToDB, getDb } = require("./db");

//  * Initialize the app
const app = express();
// * Enable CORS
app.use(cors())


//  * Set up middle ware

//  * Parse incoming JSON
app.use(express.json());
let database;

connectToDB((error) => {
	if (!error) {
		app.listen(3000, () => {
			console.log("Server is running");
		});
		database = getDb();
	}
});

// * Create RESTful API enpoints.

app.get("/api/students", (req, res) => {
	// * We have 120 record in the DB
	// * Using paginations (limit and skip)
	// * If somebody is requesting:
	// * localHost:3001/api/students === page 0
	// * localHost:3001/api/students?p=2 === page 2

	const page = req.query.p || 1;
	const studentPerPage = 10;

	let students = [];
	database
		.collection("students")
		.find()
		.sort({ id: 1 })
		.skip(page * studentPerPage)
		.limit(studentPerPage)
		.forEach((student) => students.push(student))
		.then(() => res.status(200).json(students))
		.catch(() => {
			res.status(500).json({ msg: "Error getting users" });
		});
});

// * Getting an student by ID
app.get("/api/students/:id", (req, res) => {
	const studentId = parseInt(req.params.id);
	console.log("FROM ID", studentId);
	if (!isNaN(studentId)) {
		//  * Show the student error
		database
			.collection("students")
			.findOne({ id: studentId })
			.then((student) => {
				console.log(studentId, "ID ID");
				if (student) {
					res.status(200).json(student);
				} else {
					res.status(404).json({ msg: "Student not found" });
				}
			})
			.catch(() => {
				res.status(500).json({ msg: "Error getting student info" });
			});
	} else {
		//  * Show error
		res.status(400).json({ Error: "Student ID must be a number" });
	}
})

// * Creating an student:

app.post("/api/students", async (req, res) => {
	const student = req.body;

    const newStudent = new Student({
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        gender: student.gender,
        dob: student.dob,
        password: student.password
    });

	newStudent.save()
	.then((result) => {
		console.log('student created' , result)
		res.status(200).json({result})
	})
	.catch(error => {
		console.log(error, "ERROR Saving student")
		res.status(500).json({ msg: "Error creating student" });
	}) 

	// database
	// 	.collection("students")
	// 	.insertOne(student)
	// 	.then((result) => {
	// 		console.log(result, "resultado")
	// 		res.status(200).json({ result });
	// 	})
	// 	.catch((error) => {
    //         if( error) {
    //             res.status(500).json({ msg: "Error creating student" });
    //         }
	// 	});
});

// * Updating an student
app.patch("/api/students/:id", (req, res) => {
    
	let updatedToBePatched = req.body;
	const studentId = parseInt(req.params.id);
    console.log(updatedToBePatched, "updatedToBePatched")
	if (!isNaN(studentId)) {
		database
			.collection("student")
			.updateOne({ id: studentId }, { $set: updatedToBePatched })
			.then((result) => {
				res.status(200).json({ result });
			})
			.catch(() => {
				res.status(500).json({ Err: "Err: While updating the student" });
			});
	} else {
		res.status(400).json({ Error: "Err: Student ID must be a number" });
	}
});

// * Delet a student:
app.delete("/api/students/:id", (req, res) => {
	const studentId = parseInt(req.params.id);
	database
		.collection("students")
		.deleteOne({ id: studentId })
		.then((result) => {
			res.status(200).json({ result });
		})
		.catch(() => {
			res.status(500).json({ Err: "Err: While deleting the student" });
		});
});
