Shutting Down & Cleaning Up

We don’t want our image to be running 24/7, but shutting it down can be a little tricky.

In your terminal, press

**ctrl + c**

this may or may not kill the container gracefully 🤷‍. Either way, run

**docker-compose down**

afterwards and your container should be shut down. Now you just have to run

**docker-compose up**

again and you’ll be right where you left off.

If you want a fresh start for everything, run

**docker system prune -a**

and

**docker volume prune**

The first command removes any unused containers and the second removes any unused volumes. I recommend doing this fairly often since Docker likes to stash everything away causing the gigabytes to add up.