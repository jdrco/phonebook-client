import React from 'react';

const Notification = ({ message, error }) => {
  const styles = {
    good: {
      color: 'green',
    },
    bad: {
      color: 'red',
    },
  };

  if (message === null) {
    return null;
  }
  if (error === true) {
    return (
      <>
        <div style={styles.bad}>{message}</div>
      </>
    );
  } else {
    return (
      <>
        <div style={styles.good}>{message}</div>
      </>
    );
  }
};

export default Notification;
