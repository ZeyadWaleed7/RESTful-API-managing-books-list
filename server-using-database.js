const express = require('express');
const app = express();
const port = process.env.PORT || 1245;
app.use(express.json());

const fs = require('fs');
const filePath = 'Database.csv';

const readBooks = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').map(line => {
        const [ID, Title] = line.split(',');
        return { ID: Number(ID), Title };
    }).filter(book => book.ID);
};

const writeBooks = (books) => {
    let data = 'ID,Title\n';
    books.forEach(book => {
        data += `${book.ID},${book.Title}\n`;
    });
    fs.writeFileSync(filePath, data, 'utf8');
};

app.get("/books", (req, res) => {
    const books = readBooks();
    res.send(books);
});

app.post("/books", (req, res) => {
    const { Title } = req.body;
    
    if (!Title) {
        return res.send("Enter title");
    }

    const books = readBooks();
    const newBook = {
        ID: books.length + 1,
        Title: Title
    };
    books.push(newBook);
    writeBooks(books);
    res.send(newBook);
});

app.put("/books", (req, res) => {
    const { ID, Title } = req.body;
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.ID === ID);

    if (bookIndex === -1) {
        return res.send("not found");
    }

    books[bookIndex] = { ID: ID, Title: Title };
    writeBooks(books);
    res.send(books[bookIndex]);
});

app.delete("/books", (req, res) => {
    const { ID } = req.body;
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.ID === Number(ID));

    if (bookIndex === -1) {
        return res.send("not found");
    }

    books.splice(bookIndex, 1);
    writeBooks(books);
    res.send("deleted");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});