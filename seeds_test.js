const mongoose = require('mongoose'),
      Book = require('./models/book');
      Comment = require('./models/comment');          




function seedDB(){
    //Remove all books
    Book.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed books!");
         Comment.remove({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed comments!");
              //add a few books
             data.forEach(function(seed){
                 Book.create(seed, function(err, book){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a book");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This book is AMAZING!",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     book.comments.push(comment);
                                     book.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     }); 
     //add a few comments
 }
  
 module.exports = seedDB;