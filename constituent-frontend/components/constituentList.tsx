import { Card, CardContent } from './Card';
import React from 'react';

interface Constituent {
  name: string;
  email: string;
  address: string;
  signupTime: string;
}

interface ConstituentListProps {
  constituents: Constituent[];
}

export const ConstituentList: React.FC<ConstituentListProps> = ({
  constituents,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {constituents.map((c) => (
        <Card key={c.email}>
          <CardContent className="p-4">
            <div className="font-semibold">{c.name || 'No Name'}</div>
            <div className="text-sm text-muted-foreground">{c.email}</div>
            <div className="text-sm">{c.address}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Signed up: {new Date(c.signupTime).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
