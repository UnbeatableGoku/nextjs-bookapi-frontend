import React from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loading = ({ progress }) => {
  return (
    <div>
      <LoadingBar ref={progress} color='#f11946' />
    </div>
  );
};

export default Loading;
