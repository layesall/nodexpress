const express = require("express");
const app = express();
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const notesRoutes = require('./routes/notes-routes');
const path = require("path");

// EJS
app.set("view engine", "ejs");
app.set("views", "views");

// FORM DATA Extraction
app.use(express.urlencoded({ extended: false }));

// PUBLIC - enable and use all files in public folder
app.use(express.static(path.join(__dirname, 'public')))

// MySQL
const optionDB = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "hallonodedb",
};

app.use(myConnection(mysql, optionDB, "pool"));

// ROUTER
app.use(notesRoutes)


app.get("/about", (req, res) => {
  res.status(200).render("about", { page_title: " About " });
});

app.use((req, res) => {
  res.status(404).render("error/404", { page_title: " Error 404 " });
});

/**
 * APP LISTEN
 * -------------------------------------------------------
 */
app.listen(2100, () => {
  console.log("Server running at http://localhost:2100/");
});
