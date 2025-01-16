<template>
    <div class="main-container">
      <h2>Welcome to the Main Page</h2>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('authToken');
        this.$router.push({ name: 'login' });
      }
    }
  };
  </script>
  
  <style scoped>
  .main-container {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  