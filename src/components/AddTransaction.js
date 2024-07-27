// src/components/AddTransaction.js
import React, { useState } from 'react';
import { addTransaction } from '../api';

const AddTransaction = ({ onClose }) => {
  const [transaction, setTransaction] = useState({
    type: 'Credit',
    amount: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(transaction);
      alert('Transaction added successfully!');
      setTransaction({ type: 'Credit', amount: '', description: '', date: '' });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error adding transaction:', error);
      
    }
  };

  return (
    <div className="modal">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" value={transaction.type} onChange={handleChange}>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTransaction;
