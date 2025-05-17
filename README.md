# Subslipt

**Subslipt** is a smart subscription splitting web app that helps users manage and share the costs of digital subscriptions like Netflix, Spotify, YouTube Premium, and more. Whether you're living with roommates, friends, or family — Subslipt simplifies tracking and payments so you never miss a due date or overpay again.

---

## 🌟 Features

- 📅 Create and manage subscription plans
- 👥 Add members to a subscription group
- 💸 Automatically split costs among group members
- 🤖 Plan classification using Machine Learning (Random Forest)
- 📊 Get insights on whether your plan is *good* or *bad*
- 🔔 Get reminders before due dates
- 🔐 Secure user authentication and data handling

---

## 🧠 Machine Learning (Random Forest)

We use a **Random Forest Classifier** to help users understand whether their chosen subscription plan is good or bad, based on:

- Cost per member
- Total duration
- Platform reputation
- Usage frequency
- User rating
- Historical data of similar plans

The ML model is trained and tested using `scikit-learn` and integrated into the backend using Python APIs or precomputed predictions.

---

## 🛠️ Tech Stack

| Layer           | Technology                    |
|------------------|-------------------------------|
| Frontend         | HTML, CSS, JavaScript / React |
| Backend          | Node.js, Express.js           |
| Database         | MongoDB                       |
| Authentication   | JWT / Firebase Auth           |
| Machine Learning | Python, Scikit-learn, Random Forest |
| Deployment       | Vercel / Render / Netlify / Heroku (based on your setup) |

---

## 📦 Installation

Follow these steps to run Subslipt locally:

1. **Clone the repository**

```bash
git clone https://github.com/your-username/subslipt.git
cd subslipt



2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```

4. **Start the server**

```bash
npm start
```

For ML API (if separate):

```bash
cd ml-model/
python app.py
```

---

## 📸 Screenshots

> Add UI screenshots here:

* Dashboard
* Create Subscription Group
* ML Prediction Output (Plan is Good/Bad)
* Subscription History

---

## 🧪 API Endpoints (if applicable)

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | /api/auth/register | Register a new user              |
| POST   | /api/auth/login    | Login existing user              |
| POST   | /api/subscriptions | Create a subscription            |
| GET    | /api/subscriptions | List all subscriptions           |
| POST   | /api/predict       | Predict if a plan is good or bad |

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

---


