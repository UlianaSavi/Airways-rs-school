export interface IQueryParams {
  typeOfFlight: string | null;
  from: string | null;
  destination: string | null;
  dateFrom: string | null;
  dateDestination: string | null;
  amountOfPass: {
    adult: number | null;
    child: number | null;
    infant: number | null;
  };
}
