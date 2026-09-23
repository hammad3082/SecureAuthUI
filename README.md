# SecureAuth UI 🛡️

A modern, high-performance Angular client built to showcase secure authentication flows, federated Single Sign-On (SSO), real-time presence tracking, and system audit logging.

🚀 **Live Demo:** [https://secure-auth-ui-omega.vercel.app/](https://secure-auth-ui-omega.vercel.app/)

---

## 🎯 Application Flow & Key Features

1. **Server Warmup Check:** Initiates an API call on initial page load to wake up free-tier backend servers from cold start while the user navigates the app, displaying "Systems Operational" upon success.
2. **Real-Time Active User Tracker:** Displays live online user counts using **ASP.NET Core SignalR** over WebSockets, tracking browser sessions via persistent `crypto.randomUUID()`.
3. **Authentication & Federated SSO:** 
   * Email/Password login and registration flows.
   * Federated Single Sign-On via **Google OAuth 2.0** and **AWS Cognito / OIDC**.
   * Automatic JWT management with refresh token handling.
4. **Protected Dashboard:** Secured via Angular **Route Guards** and HTTP Interceptors for automated Bearer token injection.
5. **Audit Logs View:** Interactive security log view to monitor user activity and security events.

---

## 🏗️ Architecture & Technical Stack

* **Framework:** Angular (v21+) with **Standalone Components** and `inject()`.
* **State & Reactivity:** Fine-grained reactive state managed with Angular **Signals** and targeted **RxJS** pipelines.
* **Security:** Functional HTTP Interceptors for automated JWT token handling and error recovery.
* **Real-Time Communication:** Microsoft SignalR Client with auto-reconnect logic.
* **CI/CD & Hosting:** Decoupled GitHub Actions pipeline deployed to **Vercel**.

---

## 🛠️ Getting Started Locally

### Prerequisites
* **Node.js:** v20+ recommended
* **Angular CLI:** v21+

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hammad3082/SecureAuthUI.git](https://github.com/hammad3082/SecureAuthUI.git)
   cd SecureAuthUI

2. **Install dependencies:**

    To start a local development server, run:
    
    ```bash
    ng serve
    ```
  
    Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
