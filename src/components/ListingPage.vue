<template>
    <div class="listing-container">
      <!-- Logout Button -->
      <button class="logout-button" @click="logout">Logout</button>
  
      <h1>Product Listing</h1>
  
      <!-- Filters and Sorting -->
      <div class="filters">
        <label for="availability-filter">Filter by Availability:</label>
        <select id="availability-filter" v-model="filterBy" @change="applyFilters">
          <option value="">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
  
        <label for="sort-by">Sort by:</label>
        <select id="sort-by" v-model="sortBy" @change="applySorting">
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
  
      <!-- Product Table -->
      <table class="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Availability</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>
              <img :src="product.image" alt="Product Image" class="product-image" />
            </td>
            <td>{{ product.description }}</td>
            <td :class="{ 'out-of-stock': product.availability === 'Out of Stock' }">
              {{ product.availability }}
            </td>
            <td>${{ product.price }}</td>
            <td>
              <input
                type="number"
                min="1"
                v-model.number="product.quantity"
                :disabled="product.availability === 'Out of Stock'"
              />
            </td>
            <td>
              <button
                :disabled="product.availability === 'Out of Stock' || product.quantity === 0"
                @click="addToCart(product)"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="pagination">
        <button @click="changePage('prev')" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage('next')" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        products: [],
        currentPage: 1,
        itemsPerPage: 5,
        filterBy: "",
        sortBy: "",
      };
    },
    computed: {
      filteredProducts() {
        if (!this.filterBy) return this.products;
        return this.products.filter((product) => product.availability === this.filterBy);
      },
      sortedProducts() {
        if (!this.sortBy) return this.filteredProducts;
        return [...this.filteredProducts].sort((a, b) => {
          if (this.sortBy === "price") return a.price - b.price;
          if (this.sortBy === "name") return a.description.localeCompare(b.description);
        });
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.sortedProducts.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.sortedProducts.length / this.itemsPerPage);
      },
    },
    methods: {
      fetchProducts() {
        axios
          .get("http://localhost:3000/products")
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      },
      changePage(direction) {
        if (direction === "prev" && this.currentPage > 1) {
          this.currentPage--;
        } else if (direction === "next" && this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      applyFilters() {
        this.currentPage = 1;
      },
      applySorting() {
        this.currentPage = 1; 
      },
      addToCart(product) {
        alert(`Added ${product.quantity} of "${product.description}" to the cart.`);
      },
      logout() {
        localStorage.removeItem("authToken");
        this.$router.push({ name: "login" });
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .listing-container {
    padding: 20px;
    font-family: Arial, sans-serif;
    position: relative;
  }
  
  .logout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .filters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .filters label {
    margin-right: 10px;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-table th,
  .product-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .product-table th {
    background-color: #4CAF50;
    color: white;
  }
  
  .product-image {
    width: 100px;
    height: auto;
  }
  
  .out-of-stock {
    color: red;
    font-weight: bold;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .pagination button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  