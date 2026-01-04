from flask import Blueprint, jsonify, request
from app import db
from models import Hero, HeroPower

bp = Blueprint('heroes', __name__, url_prefix='/heroes')

@bp.route('', methods=['GET'])
def get_heroes():
    heroes = Hero.query.all()
    return jsonify([hero.to_dict() for hero in heroes])

@bp.route('/<int:hero_id>', methods=['GET'])
def get_hero(hero_id):
    hero = Hero.query.get(hero_id)
    
    if not hero:
        return jsonify({"error": "Hero not found"}), 404
    
    hero_data = hero.to_dict()
    hero_powers = HeroPower.query.filter_by(hero_id=hero_id).all()
    
    hero_data['hero_powers'] = []
    for hero_power in hero_powers:
        hero_power_data = hero_power.to_dict(include=['power'])
        hero_data['hero_powers'].append(hero_power_data)
    
    return jsonify(hero_data)
