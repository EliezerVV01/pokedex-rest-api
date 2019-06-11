# pokedex-rest-api
This is an api of a pokedex. 


## Instalation 

1. Clone or download the repository. 
2. Open the project with the IDE you prefer
3. Open the terminal and run "npm install"
4. Create in the root of the project a file named ".env" and write this with its respective values

HOST=
PORT=
SERVER_URL=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_DIALECT=
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASS=
EMAIL_VALIDATION_SECRET=
AUTH_TOKEN_SECRET=
RESET_PASS_TOKEN_SECRET=
WEBAPP_LINK_VALIDATE=
WEBAPP_LINK_RESET_PASS=

5. Run 'npm start' 

## Usage 

All enpoints are auth required except the ones that says they are not

Endpoints 
api/ 
   pokemons/
           / on GET => get All Pokemons in the database (not auth required)
           / on POST => add a pokemon to a user  (Recieve a user object)
           /:id on GET => get the info of a pokemon and the info about the catch 
           /:id on PUT => edit the info about a catch (recieve a pokemon object)
      users/
           / on POST => create  user and send a email with a token (no auth required) (Recieve a user object)
           /verifyemail on PUT => set true the validated account of a existing user (no auth required) (recieve a token)
           /login on POST => log in a user (no auth required) (recieve a user object)
           /tokenpassword on POST => send a email with a token to a email (no auth required) (recieve a email)
           /recievepassword on PUT => change the password of a existing user (no auth required) (recieve a password)
           /user-pokemons on GET => return the list of pokemons of a use. (Recieve limit and offset as params)
           /getUser on GET => return the info about a user 
           /updateuser on PUT => update a user (recieve a user object)
           /profilephoto on PUT => update user profile picture (recieve a file type png, jpg o jpeg)
 
 ##More info (Important)
 
 This rest-api is greatly consumed by the web app --> https://github.com/EliezerVV01/pokedex-web-app
           
         

