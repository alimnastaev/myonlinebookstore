const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const middleware = require('../middleware')

//=========================
// Book Index
//=========================
router.get('/books', function(req, res) {
  //Get all Books from DB
  Book.find({}, function(err, Books) {
    if (err) {
      console.log(err)
    } else {
      res.render("books/index",{books: Books, page: 'books'});
    }
  })
})

//=========================
// NEW Book
//=========================
router.get('/books/new', middleware.isLoggedIn, function(req, res) {
  res.render('books/new')
})

router.post('/books', middleware.isLoggedIn, function(req, res) {
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let name = req.body.name
  let image = req.body.image
  let description = req.body.description
  let price = req.body.price
  let newBook = {
    'name': name,
    'price': price,
    'image': image,
    'description': description,
    'author': author
  }

  Book.create(newBook, function(err, Book) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/books')
    }
  })
})

//=========================
// SHOW Books
//=========================
router.get('/books/:id', function(req, res) {
  Book.findById(req.params.id).populate("comments").exec(function(err, foundBook) {
    if (err || !foundBook) {
      req.flash('error', 'Book not found')
      res.redirect('/books')
    } else {
      res.render('books/show', {
        book: foundBook
      })
    }
  })
})

//=========================
// EDIT Book
//=========================
router.get('/books/:id/edit', middleware.checkBookOwnership, function(req, res) {
  if (req.isAuthenticated()) {
    Book.findById(req.params.id, function(err, foundBook) {
      res.render('books/edit', {book: foundBook})
    })
}
})

//=========================
// UPDATE Books
//=========================
router.put('/books/:id', middleware.checkBookOwnership, function(req, res) {
  Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook) {
    if (err) {
      res.redirect('/books')
    } else {
      res.redirect('/books/' + req.params.id)
    }
  })
})

//=========================
// DELETE Books
//=========================
router.delete('/books/:id', middleware.checkBookOwnership, function(req, res) {
  Book.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/books')
    } else {
      res.redirect('/books')
    }
  })
})


module.exports = router
