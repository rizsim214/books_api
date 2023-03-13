import  express  from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
// DATABASE CONNECTIOn
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "book_collection"
});

// ROUTES
app.get("/", (req, res) => {
    res.json("HELLO THIS IS THE BACKEND API");
    console.log("CONNECTED TO ROOT ROUTE");
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        
        return res.json(data);
    })
});

app.post("/book", (req, res) => {
    const query = "INSERT INTO books(`book_desc`, `book_count`) VALUES(?)";
    const content = [
        req.body.book_desc,
        req.body.book_count
    ];

    db.query(query, [content], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    } )
})


// LISTENING PORT
app.listen(3001, () => {
    console.log("LISTENING TO PORT 3001");
});
