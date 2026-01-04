// models/locationTypes.ts
// Generic enums for transit locations (stops and stations)

export enum StopType {
  BusStop = 'bus-stop',
  TrainStation = 'train-station',
  SubwayStation = 'subway-station',
  FerryTerminal = 'ferry-terminal',
  TrolleyStop = 'trolley-stop',
  LightRailStop = 'light-rail-stop'
}

export enum StationAmenity {
  Parking = 'parking',
  BikeStorage = 'bike-storage',
  Accessible = 'accessible',
  Elevator = 'elevator',
  Escalator = 'escalator',
  Restrooms = 'restrooms',
  TicketOffice = 'ticket-office'
}
