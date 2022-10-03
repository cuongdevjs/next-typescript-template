import React, { memo } from 'react';
import { LoadingContainerWrapper } from './styled';

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingContainer = memo(({ loading, children }: Props) => {
  return (
    <LoadingContainerWrapper className={loading ? '--loading' : ''}>
      {loading && (
        <div className="loading">
          <div
            className="spinner-grow text-warning m-5"
            style={{ width: '3rem', height: '3rem' }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="--children">{children}</div>
    </LoadingContainerWrapper>
  );
});

export default LoadingContainer;
