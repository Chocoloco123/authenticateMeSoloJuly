# Welcome to Idyllic!

Link to live site:  [Idyllic](https://idyllic.herokuapp.com/)

Database schema: [wiki database schema](https://github.com/Chocoloco123/idyllicApp/wiki/Database-Schema)

Idyllic is a Flickr clone meant for anyone with an eye for beauty in nature. Users can share their favorite images and moments to showcase nature at its best. They can also comment on masterpieces to connect with a community of nature lovers from around the world.

![IdyllicAppLanding](https://res.cloudinary.com/dsz4sha80/image/upload/v1636859833/Screen_Shot_2021-11-13_at_7.16.03_PM_zwl4ge.png)

## Technologies
- React.js
- Redux
- Javascript
- Express
- Sequelize
- PostgreSQL
- Heroku

## Installing
- Download the app from [here](https://github.com/Chocoloco123/idyllicApp).
- In the main project directory `npm install`
- Starting live server:
  - Split two terminals and run `cd backend` in one and `cd frontend` in the other. In each of the terminals run `npm start`.
 
## Features
- Link to MVP features: [features](https://github.com/Chocoloco123/idyllicApp/wiki/MVP-Feature-List)
- Login, signup, and demo login
- Add, view, update, delete images
- Add, view, delete comments

## Technical Details
Some of the most challenging parts was figuring out how to edit images and post comments especially involving redirects. Editing images involved getting the image's title and content (description), but it was difficult to figure out how to handle the validation errors and how it would affect the updated image being stored in the database. Posting comments also became a bit confusing when there were multiple image id variables to keep track of especially with redirects. I had to follow my code from the backend to the front end carefully to make sure that I was naming and sending the correct information to the server. Through both of these difficult operations the redirects proved to be a challenge that would greatly affect a user's experiance. The key to the redirects were knowing when to push the appropriate result and when to reset errors. 
![EditImage](https://res.cloudinary.com/dsz4sha80/image/upload/v1636863819/Screen_Shot_2021-11-13_at_8.16.14_PM_gpwfnl.png)
![PostComment](https://res.cloudinary.com/dsz4sha80/image/upload/v1636863820/Screen_Shot_2021-11-13_at_8.21.15_PM_e2k42j.png)


## Todo/Future Features
- Albums
- AWS
- Likes
- User Profiles
 
## Acknowledgements
Inspirational images and image storage
- Pexels
- Cloudinary
- Flickr

