export interface FormProps {
  name: string;
  cpfCnpj: string;
  zipCode: string;
  neighborhood: string;
  street: string;
  number: string;
  expectedCapacity: number | null;
  area: number | null;
  numberOfFloors: number | null;
  signatureUrl: string | null;
  state: string;
  city: string;
  email: string;
  services: string[] | null;
  contractUrl: string | null;
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

export interface AddressDataProps {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  estado: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  siafi: string;
  uf: string;
  unidade: string;
}
