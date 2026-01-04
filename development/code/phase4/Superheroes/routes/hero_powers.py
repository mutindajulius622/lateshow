from flask import Blueprint, jsonify, request
from app import db
from models import Hero, Power, HeroPower

bp = Blueprint('hero_powers', __name__, url_prefix='/hero_powers')

@bp.route('', methods=['POST'])
def create_hero_power():
    data = request.get_json()
    
    # Validate required fields
    if not data or not all(key in data for key in ['strength', 'power_id', 'hero_id']):
        return jsonify({"errors": ["validation errors"]}), 400
    
    # Validate strength values
    valid_strengths = ['Strong', 'Weak', 'Average']
    if data['strength'] not in valid_strengths:
        return jsonify({"errors": ["validation errors"]}), 400
    
    # Check if hero and power exist
    hero = Hero.query.get(data['hero_id'])
    power = Power.query.get(data['power_id'])
    
    if not hero or not power:
        return jsonify({"errors": ["validation errors"]}), 400
    
    # Create new HeroPower
    hero_power = HeroPower(
        hero_id=data['hero_id'],
        power_id=data['power_id'],
        strength=data['strength']
    )
    
    try:
        db.session.add(hero_power)
        db.session.commit()
        return jsonify(hero_power.to_dict(include=['hero', 'power'])), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": ["validation errors"]}), 400
