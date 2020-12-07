export interface FlightCard {
  logo: string;
  title: string;
  subtitle: string;
  totalPaxNumber: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  questionCount: number;
  examineCount: number;
  quarantineCount: number;
}

export class FlightCard {
  constructor(
    public logo: string,
    public title: string,
    public subtitle: string,
    public totalPaxNumber: number,
    public pendingCount: number,
    public approvedCount: number,
    public rejectedCount: number,
    public questionCount: number,
    public examineCount: number,
    public quarantineCount: number
  ) {}
}
