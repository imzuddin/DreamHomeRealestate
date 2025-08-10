# DreamHomeRealestate

CCPS610 Assignment Two

# Requirements 

1. Docker for Linux 
2. Docker Compose 
3. Python

# Development 

This project relies on default formatting according to: 

1. black - Python
2. isort - Python Import s
3. prettier - JSX 

If you edit this project please run the relevant formatter before pushing to github 

# How to Run 

Project can be brought up by navigating to the project directory and running the following commands 

`docker-compose up -d`

This will pull oracle db container as well as set up both the UI and API containers 

Once this process is finished please give the API time to start up as it needs to wait for the db to initialize 

To stop the project please run 

`docker-compose down -d` 

To look at the logs for the project please run 

`docker-compose logs -f`

