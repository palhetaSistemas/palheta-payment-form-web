export interface FormProps {
  name: string;
  surname: string;
  state: string;
  city: string;
  churchPosition: string | null;
  churchName: string;
  objective: number | null;
  expectedCapacity: number | null;
  expectedCost: number | null;
  churchWidth?: string;
  churchLength?: string;
  firstBudget: boolean | null;
  expectedInvestment: number | null;
  description: string;
  mobilePhone: string;
  selectedDate: {
    date: string | null;
    time: string | null;
  };
}

export interface LocationProps {
  label: string;
  value: string;
  id: number;
}
