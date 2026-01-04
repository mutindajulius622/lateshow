from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///superheroes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import routes after app and db are initialized
from routes import heroes, powers, hero_powers

# Register blueprints
app.register_blueprint(heroes.bp)
app.register_blueprint(powers.bp)
app.register_blueprint(hero_powers.bp)

if __name__ == '__main__':
    app.run(debug=True)
