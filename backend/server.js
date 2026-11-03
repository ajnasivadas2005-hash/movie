
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/movies")
    .then(() => console.log("MongoDB Connected"))
    .catch(error => console.log("MongoDB Error:", error));

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await mongoose.connection
            .collection("movies")
            .find()
            .toArray();

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
