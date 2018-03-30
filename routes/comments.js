const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Comment = require('../models/comment')
const middleware = require('../middleware/index')

//=========================
// NEW Comment
//=========================
router.get('/books/:id/comments/new', middleware.isLoggedIn, function(req, res){
  //find book by id
  Book.findById(req.params.id, function(err, book){
    if(err){
      console.log(err)
    }
    else {
        res.render('comments/new', {book: book})
    }
  })
})

router.post('/books/:id/comments', middleware.isLoggedIn, function(req, res){
  //lookup book using id
  Book.findById(req.params.id, function(err, book){
    if(err){
      console.log(err)
      res.redirect('/books')
    }
    else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash('error', 'Something went wrong...')
          console.log(err)
        }
        else {
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save()
          book.comments.push(comment)
          book.save()
          req.flash('success', 'Comment added!')
          res.redirect('/books/' + book._id)
        }
      })
    }
  })
})

//=========================
// EDIT Comment
//=========================
router.get('/books/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
  //find book by id
  Book.findById(req.params.id, function(err, foundBook){
    if(err || !foundBook){
      req.flash('error', 'Book not found..')
      return res.redirect('back')
    }
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect('back')
      }
      else {
        res.render('comments/edit', {book_id: req.params.id, comment: foundComment})
      }
    })
  })
})

router.put('/books/:id/comments/:comment_id/', middleware.checkCommentOwnership, function(req, res){
  //find book by id
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect('back')
    }
    else {
      res.redirect('/books/' + req.params.id)
    }
  })
})

//=========================
// DELETE Comment
//=========================
router.delete('/books/:id/comments/:comment_id/', middleware.checkCommentOwnership, function(req, res){
  //find book by id
  Comment.findByIdAndRemove(req.params.comment_id, function(err, updatedComment){
    if(err){
      req.flash('error', 'Database error deleting comment...')
      res.redirect('back')
    }
    else {
      req.flash('success', 'Comment deleted')
      res.redirect('/books/' + req.params.id)
    }
  })
})


module.exports = router
