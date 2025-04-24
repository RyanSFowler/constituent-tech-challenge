import classNames from 'classnames';
import React from 'react';
import { ReactNode } from 'react';

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={classNames('rounded-2xl bg-white shadow p-4', className)}>
      {children}
    </div>
  );
};

export const CardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={classNames('', className)}>{children}</div>;
};
