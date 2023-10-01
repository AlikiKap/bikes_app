export interface Routes {
  journeys: string;
  stations: string;
}

export interface Journey {
  journey_departure: string;
  journey_return: string;
  departure_station_id: number;
  departure_station_name: string;
  return_station_id: number;
  return_station_name: string;
  covered_distance: number;
  duration: number;
}

export interface Station {
  station_name: string;
  station_id: number;
}

export interface SingleStation {
  station_name: string;
  station_id: number;
  return_count: number;
  departure_count: number;

}

export interface PageData { 
  rows: Journey[]; 
  totalPages: number 
}
export interface Table {
  table_name: string;
}