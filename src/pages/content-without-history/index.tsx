import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

export const ContentWithoutHistory = ({
  children
}: {
  children: ReactNode;
}) => {
  const params = useParams<{ number: string }>();
  return (
    <>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h3
          className={
            params.number
              ? 'text_type_digits-default'
              : 'text text_type_main-large'
          }
        >
          {params.number
            ? `#${String(params.number).padStart(6, '0')}`
            : 'Детали ингредиента'}
        </h3>
        {children}
      </div>
    </>
  );
};
