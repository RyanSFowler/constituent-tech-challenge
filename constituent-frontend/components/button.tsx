import classNames from 'classnames';
import React from 'react';
import { ButtonHTMLAttributes } from 'react';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={classNames(
        'bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50',
        props.className
      )}
    />
  );
};
