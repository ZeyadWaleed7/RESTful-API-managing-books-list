const express = require("express");
const app = express();
const port = 1245;

app.use(express.json());

var books = [
    { id: 1, name: "Quraan"},
    { id: 2, name: "Atomic habbits"},
    { id: 3, name: "how to learn js for begginers"}
]

app.get("/books", (res) => {
  res.send(books);
});

app.post("/books", (req,res) => {
  const {name} = req.body;
  
  if (!name) {
    return res.send({message: "Enter title"});
  }

  else {
    const addedBook = { id: books.length + 1,name};
    books.push(addedBook);
    res.send(addedBook);
  }

});

app.put("/books", (req,res) => {
  const { id, name } = req.body;
  const bookorder = books.findIndex(b => b.id === id);

  if (bookorder === -1) {
    return res.send({ message: "not found" });
  }

  else {
    books[bookIndex] = { id: id,name: name};
    res.send(books[bookIndex]); 
  }
});


app.delete("/books", (req,res) => {
  const {id} = req.body;
  const bookorder = books.findIndex(b => b.id === id);

  if (bookorder === -1) {
    return res.send({ message: "not found" });
  }

  else {
    books.splice(bookIndex,1);
    res.send({ message: "deleted" });
  }
});


app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}/`);
});