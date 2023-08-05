import { getStation, getStationsNamesWithId } from "../queries/station";

export const getAllStations = (req: any, res: any) => {
    getStationsNamesWithId().then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })
}

export const getStationData = (req: any, res: any) => {
    getStation(parseInt(req.params.id)).then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(500).send(error)
    })
}