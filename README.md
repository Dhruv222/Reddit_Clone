# Reddit Clone - A coding challenge for Carousell Application

## How to access the application
There are three ways of doing so:
1. Accessing the [Heroku Page](http://reddit-clone-ds222.herokuapp.com/)
2. Using Docker
3. Running the source code

### Heroku Page
The application is hosted on [heroku](http://reddit-clone-ds222.herokuapp.com/) from where it can be accessed easily like any other normal website.


### Using Docker
Using Docker the application can be easily run on your computer as the Dockerfile will handle all the prerequisites and install the dependencies. 

To do this, you need to have [Docker](https://docs.docker.com/engine/installation/#supported-platforms) installed.

After installing Docker, you need to run the following command in the terminal to build the Docker image:
```
docker build -t <name the applcation as you wish> .
```
 After building the application, you can run it through this command in the shell:
```
docker run -p <port for application access>:3001 -d <name you chose previously>
```
After this, the website is accessible on `localhost:<port you chose>`.


### Running the Source Code
Download the below software:
1. [NodeJS](https://nodejs.org/en/download/)
1. [yarn](https://yarnpkg.com/lang/en/docs/install/)

After downloading this, you need to run the command `yarn` in the source directory. This will install all the dependencies for the project.

To start the application, just type `npm start` in the terminal.
The application will be accessible on [localhost:3001](https://localhost:3001)