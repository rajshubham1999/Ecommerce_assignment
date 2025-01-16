   <template>
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">Login</h2>
        <p class="login-subtitle">Please login to your account</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="login-button">Login</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      handleLogin() {
        const validEmail = "test@example.com";
        const validPassword = "password123";
  
        if (this.email === validEmail && this.password === validPassword) {
          localStorage.setItem("authToken", "mocked-token");
          this.$router.push("/list");
        } else {
          this.errorMessage = "Invalid email or password.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
 
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    font-family: 'Arial', sans-serif;
    margin: 0;
  }
  
  
  .login-card {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    width: 400px;
    text-align: center;
    animation: fadeIn 1s ease-in-out;
  }
  
  
  .login-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .login-subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }
  
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 90%;
    padding: 10px 15px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s ease;
  }
  
  .form-group input:focus {
    border-color: #2575fc;
    outline: none;
    box-shadow: 0 0 5px rgba(37, 117, 252, 0.3);
  }
  
  
  .login-button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  
  .login-button:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
  }
  
 
  .error-message {
    color: #e74c3c;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
  }
  
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  