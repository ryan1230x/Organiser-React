# API Documentation

## Overview
This is a RESTful API written in PHP OOP, for each resource there is a directory with a model.php, view.php and index.php file, 
the model file interacts with the database, the view file interacts with the model and lastly the index is the 
endpoint the client interacts with, the pattern is resembling that of a model, view and controller.

`http://domain.com/api/{resource}`

# Resources

## GET routes

|routes                       | description
|----------------------------:|--------------------------------------------------:|
|comment/                     |GET all the comments                               |
|comment/?ticket_id=:id       |GET all the comments for a ticket                  |
|history/                     |GET all the history                                |
|history/?ticket_id=:id       |GET all the history for a ticket                   |
|snippet/?username=:username  |GET all the snippets for a user                    |
|tag/?ticket_id:id            |GET all the tags associated to a ticket            |
|tag/?status=open             |GET all the tags for tickets with a status of open |
|tag/?status=closed           |GET all tags for tickets with a closed status      |
|tag/?status=all              |GET all the tags                                   |
|ticket/?status=open          |GET all the tickets with a status of open          |
|ticket/?status=closed        |GET all the tickets with a status of closed        |
|ticket/?status=all           |GET all the tickets                                |


## POST routes
All data must be put into JSON format with the header `Content-Type:application/json`
 
| routes  |description                    |
|--------:|------------------------------:|
|comment/ |Create a new comment           |
|history/ |Create a new history log       |
|snippet/ |Create a new snippet for a use |
|tag/     |Create a new tag               |
|ticket/  |create a new ticket            |


## DELETE routes

|routes                  |description      |
|-----------------------:|----------------:|
|comment/?comment_id=:id |DELETE a comment |
|tag/?id=:tag_id         |DELETE a tag     |