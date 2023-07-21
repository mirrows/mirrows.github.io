import { useEffect, useState } from 'react';

interface IDateTextProps {
  value?: string;
  render: (stringDate: string) => JSX.Element;
}
const DateText: React.FC<IDateTextProps> = ({ value, render }) => {
  const [date, setDate] = useState(value);
  useEffect(() => {
    setDate((value ? new Date(value) : new Date()).toLocaleString());
  }, [value]);
  return render(date || '');
};

export default DateText;