import sys
import joblib
import json

# Read arguments
price = int(sys.argv[1])
slots = int(sys.argv[2])

# Load model
model = joblib.load('plan_classifier.pkl')

# Prepare input and predict
X = [[price, slots]]
pred = model.predict(X)[0]

# Output prediction
print(json.dumps({'prediction': 'good' if pred == 1 else 'bad'}))
