from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

students = [
    {"id": 1, "name": "keving", "score": 85},
    {"id": 2, "name": "andand", "score": 70},
    {"id": 3, "name": "chris", "score": 92}
]

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)
@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        return jsonify(student)
    else:
        return jsonify({"error": "Student not found"}), 404
@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    new_student = {
        "id": len(students) + 1,
        "name": data.get('name'),
        "score": data.get('score')
    }
    students.append(new_student)
    return jsonify(new_student), 201
@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    data = request.json
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        student['name'] = data.get('name', student['name'])
        student['score'] = data.get('score', student['score'])
        return jsonify(student)
    else:
        return jsonify({"error": "Student not found"}), 404
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    global students
    students = [s for s in students if s['id'] != student_id]
    return jsonify({"message": "Student deleted"})

@socketio.on('connect')
def on_connect():
    emit('message', 'Connected to the server')

@socketio.on('client_message')
def on_client_message(message):
    emit('message', f'You sent: {message}')

if __name__ == '__main__':
    socketio.run(app, debug=True)
