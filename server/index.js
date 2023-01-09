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
    "SELECT DISTINCT  * FROM posts LEFT JOIN photos ON posts.id = photos.post_id GROUP BY id;",
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
  db.query(
    "SELECT * FROM posts INNER JOIN photos ON posts.id = photos.post_id WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//@type   POST
//route for post data
app.post("/api/create", upload.array("files"), (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;
  db.query(
    "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (!req.files) {
        console.log("No file upload");
      } else if (req.files.length == 1) {
        console.log(req.files[0].filename);
        var img_src = "http://127.0.0.1:3002/images/" + req.files[0].filename;
        db.query(
          "INSERT INTO photos(photoName, post_id, photoFile)VALUES(?,?,?)",
          [req.files[0].filename, result.insertId, img_src],
          (err, result) => {
            if (err) throw err;
            console.log("file uploaded");
          }
        );
      } else {
        req.files.map((file) => {
          console.log(file.filename);
          var img_src = "http://127.0.0.1:3002/images/" + file.filename;
          db.query(
            "INSERT INTO photos(photoName, post_id, photoFile)VALUES(?,?,?)",
            [file.filename, result.insertId, img_src],
            (err, result) => {
              if (err) throw err;
              console.log("file uploaded");
            }
          );
        });
      }
    }
  );

  db.query(
    "UPDATE users SET postCount = postCount + 1 WHERE userName = ?",
    username,
    (err, res) => {
      console.log(err, res);
      if (err) {
        console.log(err);
      }
    }
  );
});

// Route for like
app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  console.log(id);
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );

  db.query(
    "UPDATE users SET likesCount = likesCount + 1 WHERE userName = ?",
    username,
    (err, res) => {
      console.log(err, res);
      if (err) {
        console.log(err);
      }
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

app.get("/api/getUsers/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT * FROM users WHERE userName = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/writeComment/:id", (req, res) => {
  const username = req.body.username;
  const text = req.body.text;
  const postId = req.params.id;

  db.query(
    "INSERT INTO comments (userName, commentText, commentPost) VALUES (?,?,?)",
    [username, text, postId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getComments/:id", (req, res) => {
  const postId = req.params.id;
  db.query(
    "SELECT * FROM comments WHERE commentPost = ?",
    postId,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.delete("/api/deleteComment/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM comments WHERE IDcomment= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/api/addCarBrand", (req, res) => {
  const brand = req.body.carBrand;
  console.log(brand);
  db.query(
    "INSERT INTO car_brand (brandName) VALUES (?)",
    [brand],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.post("/api/addCarModel", (req, res) => {
  console.log(req);

  db.query(
    "INSERT INTO car_model (brand_id, modelName) VALUES (?,?)",
    [req.body.brandId, req.body.carModel],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.post("/api/addCarEngine", (req, res) => {
  console.log(req);

  db.query(
    "INSERT INTO car_engine (pojemnosc, uklad, moc, momentObrotowy, nrSilnika) VALUES (?,?,?,?,?)",
    [
      req.body.pojemnosc,
      req.body.uklad,
      req.body.moc,
      req.body.momentObrotowy,
      req.body.nrSilnika,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getCarBrands", (req, res) => {
  db.query(
    "SELECT DISTINCT  * FROM car_brand ORDER BY brandName ASC",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/getCarModels/:brandId", (req, res) => {
  const brandId = req.params.brandId;

  db.query(
    "SELECT * FROM car_model WHERE brand_id = ? ORDER BY modelName ASC",
    [brandId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/getEngines/", (req, res) => {
  db.query("SELECT * FROM car_engine ORDER BY pojemnosc ASC", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/addCarCombined", (req, res) => {
  db.query(
    "INSERT INTO car_combined (user_id, carBrand_id, carModel_id, carEngine_id, rocznik) VALUES (?,?,?,?,?)",
    [
      req.body.userId,
      req.body.carBrand_id,
      req.body.carModel_id,
      req.body.carEngine_id,
      req.body.rocznik,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getUserCar/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT car_combined.carCombined_id, car_combined.rocznik, users.id_user, car_brand.brandName, car_model.modelName, car_engine.pojemnosc, car_engine.moc, car_engine.uklad FROM car_combined INNER JOIN users ON car_combined.user_id = users.id_user INNER JOIN car_brand ON car_combined.carBrand_id  = car_brand.brand_id INNER JOIN car_model ON car_combined.carModel_id  = car_model.model_id INNER JOIN car_engine ON car_combined.carEngine_id  = car_engine.engine_id WHERE car_combined.user_id = ?;",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

// SELECT car_combined.carCombined_id, car_combined.rocznik, users.id_user, car_brand.brandName, car_model.modelName, car_engine.pojemnosc, car_engine.moc, car_engine.uklad
// FROM car_combined
// INNER JOIN users ON car_combined.user_id = users.id_user
// INNER JOIN car_brand ON car_combined.carBrand_id  = car_brand.brand_id
// INNER JOIN car_model ON car_combined.carModel_id  = car_model.model_id
// INNER JOIN car_engine ON car_combined.carEngine_id  = car_engine.engine_id;
