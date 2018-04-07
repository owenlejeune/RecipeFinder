# Recipe Finder
A simple website for finding recipes built using the [Food2Fork API](http://food2fork.com/) and Express.js

### Development Environment
* node 9.9.0
* npm 5.8.0
* MacOS 10.13.3

### Dependencies
* node.js
* npm

# Installation Instructions
* Clone repo to local machine
* Open a terminal window at the root project directory
* Run _npm install_ to install project dependencies

# Running the App
### Starting the server
* _npm start_ from root project directory

### Using Browser Client
1. Navigate to the homepage using any of the following:
    * http://localhost:3000
    * http://localhost:3000/
    * http://localhost:3000/recipes
    * http://localhost:3000/recipes.html
    * http://localhost:3000/index.html
2. To search for recipes, enter a single ingredient, or a comma-separated or 'and' separated list of ingredients:
    * Basil
    * Basil,Cumin
    * Basil and Cumin
3. A query can also be typed directly into the address bar by typing *recipes/ingredients?=* followed by the desired ingredients
    * http://localhost:3000/recipes/ingredients?=cumin
    * http://localhost:3000/recipes?ingredients=Basil,Cumin
4. Clicking on a recipe image or title will open the source link for that recipe in a new tab
5. Clicking on the 'Recipes' header image at the top of the page will redirect back to the homepage
