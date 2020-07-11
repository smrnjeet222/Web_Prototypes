from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with

app = Flask(__name__)
api = Api(app)

video_put_args = reqparse.RequestParser()

video_put_args.add_argument(
    "name", type=str, help="Name is required", required=True)
video_put_args.add_argument(
    "views", type=int, help="Views are required", required=True)
video_put_args.add_argument(
    "likes", type=int, help="Likes on video", required=False)

videos = {}


def abortIfVideoExist(v_id):
    if v_id in videos:
        abort(409, message="Video id already exists")


def abortIfVideoDoesntExist(v_id):
    if v_id not in videos:
        abort(404, message="Video id doesn't exists")


class Video(Resource):
    def get(self, v_id):
        abortIfVideoDoesntExist(v_id)
        return videos.get(v_id)

    def put(self, v_id):
        abortIfVideoExist(v_id)
        args = video_put_args.parse_args()
        videos[v_id] = args
        return videos[v_id], 201

    def delete(self, v_id):
        abortIfVideoDoesntExist(v_id)
        del videos[v_id]
        return "", 204


api.add_resource(Video, "/video/<int:v_id>")


if __name__ == "__main__":
    app.run(debug=True)
