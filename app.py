from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Speicher für Termine
appointments = []

# Home-Seite
@app.route("/")
def index():
    return render_template("index.html", title="AutoCalendar")

# API: Termine abrufen
@app.route("/api/appointments", methods=["GET"])
def get_appointments():
    return jsonify(appointments)

# API: Termin hinzufügen
@app.route("/api/appointments", methods=["POST"])
def add_appointment():
    data = request.get_json()
    # Erwartet: {"day": 1, "start": 9.5, "end": 12, "title": "Meeting"}
    try:
        day = int(data["day"])
        start = float(data["start"])
        end = float(data["end"])
        title = str(data["title"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"error": "Invalid data"}), 400

    step = 0.25  # 15 Minuten Blöcke
    for t in frange(start, end, step):
        appointments.append({
            "day": day,
            "time": t,
            "title": title
        })
    return jsonify({"status": "ok"}), 201

# Hilfsfunktion für float ranges
def frange(start, stop, step):
    while start < stop:
        yield round(start, 2)  # Rundung, um Float-Genauigkeit zu vermeiden
        start += step

if __name__ == "__main__":
    app.run(debug=True)
