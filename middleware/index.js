//All Middle Goes methodOverride
const Book = require('../models/book')
const Comment = require('../models/comment')

const middlewareObj = {}

  middlewareObj.checkCommentOwnership = function(req, res, next) {
      if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
          if (err || !foundComment) {
            req.flash('error', 'Comment not found..')
            res.redirect('back')
          } else {
            if (req.user && foundComment.author.id.equals(req.user._id)) {
              next()
            } else {
              req.flash('error', 'You don\'t have permission..')
              res.redirect('back')
            }
          }
        })
      } else {
        req.flash('error', 'You need to be logged in...')
        res.redirect('back')
      }
    }


  middlewareObj.checkBookOwnership = function(req, res, next) {
      if (req.isAuthenticated()) {
        Book.findById(req.params.id, function(err, foundBook) {
          if (err || !foundBook) {
            req.flash('error', 'Book not found...')
            res.redirect('back')
          } else {
            if (req.user && foundBook.author.id.equals(req.user._id)) {
              next()
            } else {
              req.flash('error', 'You don\'t have permissions..')
              res.redirect('back')
            }
          }
        })
      } else {
        req.flash('error', 'You need to be logged in...')
        res.redirect('back')
      }
    }

    middlewareObj.isLoggedIn = function(req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      req.flash('error', 'You need to be logged in...')
      res.redirect('/login')
    }




module.exports = middlewareObj;
