
from app import db
from sqlalchemy import CheckConstraint

class Hero(db.Model):
    __tablename__ = 'heroes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    super_name = db.Column(db.String(100), nullable=False)
    
    # Relationship with HeroPower
    hero_powers = db.relationship('HeroPower', backref='hero', cascade='all, delete-orphan')
    
    def to_dict(self, exclude=None):
        data = {
            'id': self.id,
            'name': self.name,
            'super_name': self.super_name
        }
        if exclude:
            for field in exclude:
                data.pop(field, None)
        return data


class Power(db.Model):
    __tablename__ = 'powers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    # Relationship with HeroPower
    hero_powers = db.relationship('HeroPower', backref='power', cascade='all, delete-orphan')
    
    __table_args__ = (
        db.CheckConstraint('length(description) >= 20', name='description_length_check'),
    )
    
    def to_dict(self, exclude=None):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
        if exclude:
            for field in exclude:
                data.pop(field, None)
        return data


class HeroPower(db.Model):
    __tablename__ = 'hero_powers'
    
    id = db.Column(db.Integer, primary_key=True)
    hero_id = db.Column(db.Integer, db.ForeignKey('heroes.id'), nullable=False)
    power_id = db.Column(db.Integer, db.ForeignKey('powers.id'), nullable=False)
    strength = db.Column(db.String(20), nullable=False)
    
    __table_args__ = (
        db.CheckConstraint("strength IN ('Strong', 'Weak', 'Average')", name='strength_check'),
    )
    
    def to_dict(self, include=None):
        data = {
            'id': self.id,
            'hero_id': self.hero_id,
            'power_id': self.power_id,
            'strength': self.strength
        }
        
        if include:
            if 'hero' in include:
                data['hero'] = self.hero.to_dict(exclude=['hero_powers'])
            if 'power' in include:
                data['power'] = self.power.to_dict(exclude=['hero_powers'])
                
        return data
