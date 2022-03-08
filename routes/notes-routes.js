const express = require("express");
const router = express.Router();

router.post("/notes", (req, res) => {
  let id = req.body.id === "" ? null : req.body.id;
  let title = req.body.title;

  let reqSQL =
    id === null
      ? "INSERT INTO notes (id, title) VALUES(?, ?) "
      : "UPDATE notes SET title = ? WHERE id = ?";

  let dataSQL = id === null ? [null, title] : [title, id];

  if (title !== "") {
    req.getConnection((err, connect) => {
      if (err) {
        console.log(err);
        res.status(500).render("error/500", { page_title: " Error 500 ", err });
      } else {
        connect.query(reqSQL, dataSQL, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).render("error/500", { page_title: " Error 500 ", err });
          } else {
            res.status(300).redirect("/");
          }
        });
      }
    });
  }
});

router.get("/", (req, res) => {
  req.getConnection((err, connect) => {
    if (err) {
      console.log(err);
      res.status(500).render("error/500", { page_title: " Error 500 ", err });
    } else {
      connect.query("SELECT * FROM notes", [], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).render("error/500", { page_title: " Error 500 ", err });
        } else {
          res.status(200).render("index", { page_title: " Accueil ", result });
        }
      });
    }
  });
});

router.delete("/notes/:id", (req, res) => {
  let id = req.params.id;
  let reqSQL = "DELETE FROM notes WHERE id = ?";

  req.getConnection((err, connect) => {
    if (err) {
      console.log(err);
      res.status(500).render("error/500", { page_title: " Error 500 ", err });
    } else {
      connect.query(reqSQL, [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).render("error/500", { page_title: " Error 500 ", err });
        } else {
          res.status(200).json({ routeRacine: "/" });
        }
      });
    }
  });
});

module.exports = router;
