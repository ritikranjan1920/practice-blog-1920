from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from datetime import datetime
from main import db, login_manager
from flask import current_app
from sqlalchemy import Column, String, Text, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True)
    username = Column(String(20), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    image_file = Column(String(20), nullable=False, default='default.jpg')
    password = Column(String(60), nullable=False)
    posts = relationship('Post', backref='author', lazy=True)

    def get_reset_token(self, expires_sec=180):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    date_posted = Column(DateTime, nullable=False, default=datetime.utcnow)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"
