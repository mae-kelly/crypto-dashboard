import dataiku
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
import re

# Input/output datasets
input_dataset_names = ['table1', 'table2', 'table3', 'table4']
output_dataset = dataiku.Dataset("output_table")

# Keywords to search for
EMAIL_KEYWORDS = ['email', 'e-mail', 'mail']
TEXT_KEYWORDS = ['text', 'sms', 'message', 'messaging']
GENERAL_KEYWORDS = ['e communication', 'ecommunication', 'e-communication']

# Training data - examples of positive and negative contexts
POSITIVE_EXAMPLES = [
    "email opt-in preference",
    "can receive text messages",
    "subscribed to email communications",
    "consent for sms notifications",
    "email delivery enabled",
    "text message capability available",
    "authorized email contact",
    "accepts electronic communications",
    "prefers email method",
    "messaging channel active"
]

NEGATIVE_EXAMPLES = [
    "no email preference",
    "opted out of text",
    "email declined",
    "unsubscribed from messages",
    "text not available",
    "email prohibited",
    "cannot send sms",
    "messaging disabled",
    "do not email",
    "rejected text communications"
]

class SimpleNeuralNet:
    """Simple feedforward neural network with backpropagation"""
    
    def __init__(self, input_size, hidden_size=10, learning_rate=0.01):
        # Initialize weights with Xavier initialization
        self.W1 = np.random.randn(input_size, hidden_size) * np.sqrt(2.0 / input_size)
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, 1) * np.sqrt(2.0 / hidden_size)
        self.b2 = np.zeros((1, 1))
        self.learning_rate = learning_rate
        
    def relu(self, Z):
        """ReLU activation function"""
        return np.maximum(0, Z)
    
    def relu_derivative(self, Z):
        """Derivative of ReLU"""
        return (Z > 0).astype(float)
    
    def sigmoid(self, Z):
        """Sigmoid activation for output layer"""
        return 1 / (1 + np.exp(-np.clip(Z, -500, 500)))
    
    def forward(self, X):
        """Forward propagation"""
        self.Z1 = np.dot(X, self.W1) + self.b1
        self.A1 = self.relu(self.Z1)
        self.Z2 = np.dot(self.A1, self.W2) + self.b2
        self.A2 = self.sigmoid(self.Z2)
        return self.A2
    
    def backward(self, X, y, output):
        """Backward propagation"""
        m = X.shape[0]
        
        # Output layer gradients
        dZ2 = output - y
        dW2 = np.dot(self.A1.T, dZ2) / m
        db2 = np.sum(dZ2, axis=0, keepdims=True) / m
        
        # Hidden layer gradients
        dA1 = np.dot(dZ2, self.W2.T)
        dZ1 = dA1 * self.relu_derivative(self.Z1)
        dW1 = np.dot(X.T, dZ1) / m
        db1 = np.sum(dZ1, axis=0, keepdims=True) / m
        
        # Update parameters using gradient descent
        self.W2 -= self.learning_rate * dW2
        self.b2 -= self.learning_rate * db2
        self.W1 -= self.learning_rate * dW1
        self.b1 -= self.learning_rate * db1
    
    def train(self, X, y, epochs=100):
        """Train the network"""
        for epoch in range(epochs):
            # Forward pass
            output = self.forward(X)
            
            # Backward pass and parameter optimization
            self.backward(X, y, output)
            
            # Calculate loss every 20 epochs
            if epoch % 20 == 0:
                loss = -np.mean(y * np.log(output + 1e-8) + (1 - y) * np.log(1 - output + 1e-8))
                print(f"Epoch {epoch}, Loss: {loss:.4f}")
    
    def predict(self, X):
        """Make predictions"""
        return self.forward(X)

# Prepare training data
print("Training neural network model...")
all_examples = POSITIVE_EXAMPLES + NEGATIVE_EXAMPLES
labels = np.array([1] * len(POSITIVE_EXAMPLES) + [0] * len(NEGATIVE_EXAMPLES)).reshape(-1, 1)

# Vectorize text data using TF-IDF
vectorizer = TfidfVectorizer(max_features=50, ngram_range=(1, 2))
X_train = vectorizer.fit_transform(all_examples).toarray()

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)

# Initialize and train neural network
nn = SimpleNeuralNet(input_size=X_train.shape[1], hidden_size=15, learning_rate=0.1)
nn.train(X_train, labels, epochs=200)

print("\nModel training complete!")

def extract_context(text, keyword, window=100):
    """Extract context around keyword"""
    text_lower = str(text).lower()
    match = re.search(rf'.{{0,{window}}}{re.escape(keyword)}.{{0,{window}}}', text_lower)
    return match.group(0) if match else text_lower[:200]

def predict_capability(text):
    """Use trained neural network to predict if text indicates capability"""
    if pd.isna(text) or not text:
        return 0.0
    
    # Vectorize and scale the input
    X = vectorizer.transform([str(text).lower()]).toarray()
    X = scaler.transform(X)
    
    # Get prediction from neural network
    prediction = nn.predict(X)[0][0]
    
    return float(prediction)

# Process datasets
results = {}

for dataset_name in input_dataset_names:
    print(f"\nProcessing {dataset_name}...")
    df = dataiku.Dataset(dataset_name).get_dataframe()
    
    if 'idn_eon' not in df.columns:
        print(f"⚠️  Skipping {dataset_name} - no idn_eon column")
        continue
    
    unique_idns = df['idn_eon'].dropna().unique()
    print(f"Found {len(unique_idns)} unique idn_eon values")
    
    for idn_eon in unique_idns:
        if idn_eon not in results:
            results[idn_eon] = {
                'idn_eon': idn_eon,
                'data_sources': set(),
                'email_findings': [],
                'text_findings': []
            }
        
        results[idn_eon]['data_sources'].add(dataset_name)
        idn_rows = df[df['idn_eon'] == idn_eon]
        
        # Check all columns
        for col in df.columns:
            if col == 'idn_eon':
                continue
            
            for idx, value in idn_rows[col].items():
                if pd.isna(value):
                    continue
                
                value_str = str(value).lower()
                
                # Check for email keywords
                for keyword in EMAIL_KEYWORDS:
                    if keyword in value_str:
                        context = extract_context(value, keyword)
                        confidence = predict_capability(context)
                        
                        # Only consider it a capability if confidence > 0.5
                        if confidence > 0.5:
                            results[idn_eon]['email_findings'].append({
                                'location': f"{col} [{dataset_name}]",
                                'confidence': confidence
                            })
                
                # Check for text keywords
                for keyword in TEXT_KEYWORDS:
                    if keyword in value_str:
                        context = extract_context(value, keyword)
                        confidence = predict_capability(context)
                        
                        if confidence > 0.5:
                            results[idn_eon]['text_findings'].append({
                                'location': f"{col} [{dataset_name}]",
                                'confidence': confidence
                            })
                
                # Check for general e-communication keywords
                for keyword in GENERAL_KEYWORDS:
                    if keyword in value_str:
                        context = extract_context(value, keyword)
                        confidence = predict_capability(context)
                        
                        if confidence > 0.5:
                            results[idn_eon]['email_findings'].append({
                                'location': f"{col} [{dataset_name}]",
                                'confidence': confidence
                            })
                            results[idn_eon]['text_findings'].append({
                                'location': f"{col} [{dataset_name}]",
                                'confidence': confidence
                            })

# Build output
print("\nBuilding output dataset...")
output_data = []

for idn_eon, data in results.items():
    has_email = len(data['email_findings']) > 0
    has_text = len(data['text_findings']) > 0
    
    if has_email or has_text:
        comm_type = []
        if has_email:
            comm_type.append('Email')
        if has_text:
            comm_type.append('Text')
        
        # Get highest confidence and deduplicate locations
        email_confidence = max([f['confidence'] for f in data['email_findings']], default=0.0)
        text_confidence = max([f['confidence'] for f in data['text_findings']], default=0.0)
        
        email_locations = list(set([f['location'] for f in data['email_findings']]))
        text_locations = list(set([f['location'] for f in data['text_findings']]))
        
        output_data.append({
            'idn_eon': idn_eon,
            'data_source': ', '.join(sorted(data['data_sources'])),
            'communication_type': ', '.join(comm_type),
            'email_found_in': ', '.join(sorted(email_locations)) if email_locations else '',
            'email_confidence': round(email_confidence, 3) if has_email else '',
            'text_found_in': ', '.join(sorted(text_locations)) if text_locations else '',
            'text_confidence': round(text_confidence, 3) if has_text else ''
        })

output_df = pd.DataFrame(output_data).sort_values('idn_eon').reset_index(drop=True)
output_dataset.write_with_schema(output_df)

print(f"\n{'='*60}")
print(f"✅ PROCESSING COMPLETE")
print(f"{'='*60}")
print(f"Total unique idn_eon processed: {len(results)}")
print(f"IDNs with communication capabilities: {len(output_df)}")
print(f"High confidence (>0.8): {len(output_df[(output_df['email_confidence'] > 0.8) | (output_df['text_confidence'] > 0.8)])}")
print(f"Medium confidence (0.6-0.8): {len(output_df[((output_df['email_confidence'] >= 0.6) & (output_df['email_confidence'] <= 0.8)) | ((output_df['text_confidence'] >= 0.6) & (output_df['text_confidence'] <= 0.8))])}")
