// src/api.js
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:3000';

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// Function to get all transactions
export const getAllTransactions = async () => {
  try {
    const response = await api.get('/transactions/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Function to add a new transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions/add', transaction);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};
