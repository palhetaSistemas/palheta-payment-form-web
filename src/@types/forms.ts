export interface FormProps {
  name: string;
  cpfCnpj: string;
  zipCode: string;
  neighborhood: string;
  street: string;
  number: string;
  state: string;
  city: string;
  email: string;
  service: string | null;
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
