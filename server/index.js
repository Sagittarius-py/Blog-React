const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "pictures");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
let upload = multer({ dest: "pictures/" });

//* Working wersion
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// !do zrobienia
// app.get("/api/get", (req, res) => {
//   db.query(
//     "SELECT * FROM posts FULL OUTER JOIN photos ON posts.id = photos.post_id",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send(result);
//     }
//   );
// });

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

// Route for creating the post
app.post("/api/create", upload.single("file"), (req, res, next) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;
  const file = req.file;

  console.log(file.filename);

  db.query(
    "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result.insertId);
      insertImage(result);
    }
  );

  // db.query("SELECT id FROM posts WHERE id = ?", id, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // })

  function insertImage(result) {
    let directory = "./pictures/" + file.filename;
    let postId = result.insertId;
    db.query(
      "INSERT INTO photos (photoName, photoDir, post_id) VALUES (?,?,?)",
      [file.filename, directory, postId],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  res.send(file);
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

// Files -----------------------------
