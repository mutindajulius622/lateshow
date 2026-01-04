from flask import Blueprint, jsonify, request
from app import db
from models import Power

bp = Blueprint('powers', __name__, url_prefix='/powers')

@bp.route('', methods=['GET'])
def get_powers():
    powers = Power.query.all()
    return jsonify([power.to_dict() for power in powers])

@bp.route('/<int:power_id>', methods=['GET'])
def get_power(power_id):
    power = Power.query.get(power_id)
    
    if not power:
        return jsonify({"error": "Power not found"}), 404
    
    return jsonify(power.to_dict())

@bp.route('/<int:power_id>', methods=['PATCH'])
def update_power(power_id):
    power = Power.query.get(power_id)
    
    if not power:
        return jsonify({"error": "Power not found"}), 404
    
    data = request.get_json()
    
    if 'description' in data:
        power.description = data['description']
        
        try:
            db.session.commit()
            return jsonify(power.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({"errors": ["validation errors"]}), 400
    
    return jsonify({"errors": ["validation errors"]}), 400
