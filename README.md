# Mentor.ai - Platform Run Protocol

This repository houses the complete architecture for **Mentor.ai**. All backend domains (Identity Authentication, Diagnostic Evaluations, and Continuous Practice Drills) are consolidated into a single monolithic gateway running on **Port 8000**.

---

## ── 1. BACKEND SERVICE ENGINE (PORT 8000) ──

### Prerequisites
Before initializing the Python server, ensure your environment variables are set in your `.env` file and cloud instances are online:
* **Supabase relational database project** must be unpaused and active.
* **Upstash Redis memory database** must be reachable.

### Launch Commands
Open a terminal window, navigate to your backend directory, and execute the Uvicorn cluster:

```bash
cd mentor-ai-service
uvicorn main:app --host 0.0.0.0 --port 8000 --reload


👉 Verify Live API Documentation Map: Once the server is online, open your browser and navigate to: http://localhost:8000/docs to test routers interactively.

── 2. FRONTEND MOBILE APP CLIENT (EXPO) ──
export const BASE_API_GATEWAY = "[http://192.168.1.](http://192.168.1.)XX:8000"; // 🧠 Bind your computer's local network IP here


Launch Commands
Open a separate terminal window, navigate to your React Native workspace directory, and initialize the Expo bundler:

```bash
cd mentor-ai-client
npx expo start
