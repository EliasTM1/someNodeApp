const express = require('express')

const {connectToDB, getDb} = require('./db')

const app = express()

let database

connectToDB((error)=> {
    if(!error) {
        app.listen(3000, () => {
            console.log("Server is running")
        })
        db = getDb()
    }
})

