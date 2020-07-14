from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class VideoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    views = db.Column(db.Integer, nullable=False)
    likes = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Video(name: {self.name}, views: {self.views}, likes: {self.likes} )"


# Run only once
db.create_all()

video_put_args = reqparse.RequestParser()

video_put_args.add_argument(
    "name", type=str, help="Name is required", required=True)
video_put_args.add_argument(
    "views", type=int, help="Views are required", required=True)
video_put_args.add_argument(
    "likes", type=int, help="Likes on video", required=False)

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'views': fields.Integer,
    'likes': fields.Integer
}


class Video(Resource):
    @marshal_with(resource_fields)
    def get(self, v_id):
        rslt = VideoModel.query.filter_by(id=v_id).first()
        if not rslt:
            abort(404, message="No id Found...")
        return rslt

    @marshal_with(resource_fields)
    def put(self, v_id):
        args = video_put_args.parse_args()
        rslt = VideoModel.query.filter_by(id=v_id).first()
        if rslt:
            abort(409, message="Video id taken...")

        video = VideoModel(
            id=v_id, name=args['name'], views=args['views'], likes=args['likes'])

        db.session.add(video)
        db.session.commit()
        return video, 201


api.add_resource(Video, "/video/<int:v_id>")


if __name__ == "__main__":
    app.run(debug=True)
