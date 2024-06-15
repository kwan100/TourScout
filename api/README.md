**Setup instructions**

1. pull folder from github
2. install homebrew
3. do 'brew install python' (installs python3)
4. do 'brew install pipenv' (installs pipenv, a virtual environment manager for dependency management)
5. navigate to the /api directory and run 'pipenv shell' to start the virtual environment
6. pip install fastapi
7. pip install "uvicorn[standard]"
8. pip install fastapi-sqlalchemy
9. pip install psycopg2-binary
10. pip install alembic
11. run the app using 'python3 -m uvicorn main:app --reload
12. in web browser, go to '127.0.0.1:8000/api/docs


### Creating a new Table

1. Edit models.py
2. Edit main.py
3. alembic revision --autogenerate -m "New Migration"
4. edit new migration under versions (green in vscode)
5. Add table here
6. alembic upgrade head

