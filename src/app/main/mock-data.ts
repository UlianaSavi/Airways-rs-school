export const mockCities: City[] = [
  {
    id: '85cdcc78-3039-486f-9ff3-7bbb1331619a',
    type: 'city',
    code: 'MAD',
    name: 'Madrid',
    country_code: 'ES',
    country_name: 'Spain',
    main_airport_name: 'Adolfo Suarez Madrid-Barajas Airport',
  },
  {
    id: 'a454dfd2-9696-4715-b57d-30a8a8bf396d',
    type: 'city',
    code: 'MAA',
    name: 'Chennai',
    country_code: 'IN',
    country_name: 'India',
    main_airport_name: 'Chennai Airport',
  },
  {
    id: 'aee42337-93b8-4df6-9916-305625d923d2',
    type: 'city',
    code: 'PMY',
    name: 'Puerto Madryn',
    country_code: 'AR',
    country_name: 'Argentina',
    main_airport_name: 'El Tehuelche',
  },
  {
    id: '430a7754-7be4-471b-a2b0-b64043b9dcfa',
    type: 'city',
    code: 'CLQ',
    name: 'Colima',
    country_code: 'MX',
    country_name: 'Mexico',
    main_airport_name: 'Colima Airport',
  },
  {
    id: '480d391c-7519-4579-a221-4411e071016e',
    type: 'city',
    code: 'CAI',
    name: 'Cairo',
    country_code: 'EG',
    country_name: 'Egypt',
    main_airport_name: 'Cairo International Airport',
  },
  {
    id: '58d7a2c2-a7b8-4aad-a4c7-f7117b367c1b',
    type: 'city',
    code: 'FRA',
    name: 'Frankfurt',
    country_code: 'DE',
    country_name: 'Germany',
    main_airport_name: null,
  },
  {
    id: '1d0fc1b6-9754-4371-913a-50e0dbf4b80d',
    type: 'city',
    code: 'BKK',
    name: 'Bangkok',
    country_code: 'TH',
    country_name: 'Thailand',
    main_airport_name: null,
  },
];

export interface City {
  id: string;
  type: string;
  code: string;
  name: string;
  country_code: string;
  country_name: string;
  main_airport_name: string | null;
}
