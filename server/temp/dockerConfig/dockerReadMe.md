0. Make sure your mysql service is NOT running
1. ./config place your config.js as in the template
2. run docker compose up to start the database service
3. run npm start in seperate terminal to install dependencies

Instructions from the web

/*****************************************************/
Shutting Down & Cleaning Up

We don’t want our image to be running 24/7, but shutting it down can be a little tricky.

In your terminal, press (to persist data)

**ctrl + c**

this may or may not kill the container gracefully 🤷‍. Either way, run (this will drop tables and start afresh)

**docker-compose down**

afterwards and your container should be shut down. Now you just have to run

**docker-compose up**

again and you’ll be right where you left off.

If you want a fresh start for everything, run

**docker system prune -a**

and

**docker volume prune**

The first command removes any unused containers and the second removes any unused volumes. I recommend doing this fairly often since Docker likes to stash everything away causing the gigabytes to add up.