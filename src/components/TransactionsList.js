// components/TransactionsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the backend API
    axios.get('http://localhost:3000/transactions/all')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  const calculateBalance = () => {
    let balance = 0;
    return transactions.map(transaction => {
      if (transaction.type === 'Credit') {
        balance += transaction.amount;
      } else if (transaction.type === 'Debit') {
        balance -= transaction.amount;
      }
      return { ...transaction, balance: balance.toFixed(2) };
    });
  };

  const transactionsWithBalance = calculateBalance();

  return (
    <div className="centered-container">
      <div className="table-container">
        <h2>office transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactionsWithBalance.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.type === 'Credit' ? transaction.amount : ''}</td>
                <td>{transaction.type === 'Debit' ? transaction.amount : ''}</td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
