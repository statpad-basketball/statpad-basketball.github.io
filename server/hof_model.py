from flask import Flask, jsonify, request
import joblib
import os
import sklearn

app = Flask(__name__)

model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'models', 'HOF-classifier.pkl')

print(model_path)

# Load the trained model
model = joblib.load(model_path)

model_cols = [ 'MVP',  'All_Star',  'FG%_totals',  'TRB_totals',  'BLK_totals',  'pts_per_g_seasonal',  'ws_seasonal',  'PER_advanced',  'OWS_advanced',  'DWS_advanced',  'Champ']

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the input values from the request body
        input_values = request.json
        
        # Prepare the input data for prediction
        input_data = [[input_values.get(col, 0) for col in model_cols]]

        # Make predictions using the loaded model
        predicted_probabilities = model.predict_proba(input_data)[:,1]

        # Return the predicted probabilities as the API response
        return jsonify({'predictedProbabilities': predicted_probabilities.tolist()})
    except Exception as e:
        print('Error predicting:', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run()