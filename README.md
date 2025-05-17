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
