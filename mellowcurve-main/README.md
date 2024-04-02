# MellowCurve

## Setup
1. Install nodejs. You can get the raw files [here](https://nodejs.org/en) or install using `homebrew` on mac or `apt` on linux, which I would recommend. You should now be able to navigate into the fronend folder and run `npm start`
2. Create a python virtual environment and install dependencies:
```
$ python3 -m venv env
$ source env/bin/activate
$ pip install -f requirements.txt

WINDOWS
$ python3 -m venv env
$ env\Scripts\activate.bat
$ pip install -r requirements.txt
```

Run `python ./manage.py migrate` once you have correctly configured MySQL (in settings.py). This will bring in all the the required tables.

You should now be able to run the backend by navigating into the backend folder and running `python manage.py runserver`


## Future Changes
* Make login on homescreen
    * Upon logging in, you reach the screen with tracks and stuff
    * Header with different things like `File` and `Edit`. Under `File` dropdown, you can upload files and access the standard asset library


## Resources
* https://reactronica.com/
* https://tonejs.github.io/
* https://p5js.org/reference/#/libraries/p5.sound



## Created for UW-Madison CS506 -- Spring 2023
* Evan Wireman
* Chelsea Verheyen
* Nick Clements
* Alexa Geniesse
* Kyra O'Malley
* Nathan Thomas-Benke