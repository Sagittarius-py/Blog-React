const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

// Get all posts and photos
app.get("/api/get", (req, res) => {
  db.query(
    "SELECT * FROM posts INNER JOIN photos ON posts.id = photos.post_id",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//@type   POST
//route for post data
app.post("/api/create", upload.single("file"), (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;
  const file = req.file;
  db.query(
    "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (!req.file) {
        console.log("No file upload");
      } else {
        console.log(req.file.filename);
        var img_src = "http://127.0.0.1:3002/images/" + req.file.filename;
        var insertData =
          "INSERT INTO photos(photoName, post_id, photoFile)VALUES(?,?,?)";
        db.query(
          insertData,
          [req.file.filename, result.insertId, img_src],
          (err, result) => {
            if (err) throw err;
            console.log("file uploaded");
          }
        );
      }
    }
    // res.send(file);
  );
});

// Route for like
app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to delete a post

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// ----------------------- USERS

// Route for creating the user
app.post("/api/createUser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const access_lvl = req.body.access_lvl;
  const about = req.body.about;

  console.log(username, password, access_lvl, about);

  db.query(
    "INSERT INTO users (userName, password, access_lvl, about) VALUES (?,?,?,?)",
    [username, password, access_lvl, about],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to get all posts
app.get("/api/getUsersNames", (req, res) => {
  db.query("SELECT userName FROM users", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
