import React from 'react';

export default function DateFormatter({ date }) {

  if (!date || isNaN(date.getTime())) {
    return <span>Invalid Date</span>;
  }

  const pad = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const formattedDate = `${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;

  return <span>{formattedDate}</span>;
};
