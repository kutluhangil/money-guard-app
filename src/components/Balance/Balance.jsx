import React from 'react';
import { useSelector } from 'react-redux';

const Balance = () => {
  const amount = useSelector((state) => state.auth.user?.balance) || 0;
  return (
    <div className="balance">
      <h3>Balance</h3>
      <p>{amount}</p>
    </div>
  );
};

export default Balance;
