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
