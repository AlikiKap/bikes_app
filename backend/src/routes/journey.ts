import { getJourneysData } from "../queries/journey";

export const getAllJourneys = (req: any, res: any) => {
    getJourneysData().then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })
}