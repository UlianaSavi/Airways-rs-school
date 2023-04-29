export interface City {
  id: string;
  type: string;
  code: string;
  name: string;
  country_code: string;
  country_name: string;
  main_airport_name: string | null;
}
