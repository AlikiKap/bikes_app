import { getJourneysData } from "../queries/journey";

const itemsPerPage = 20;

export const getAllJourneys = (req: any, res: any) => {
    const { page } = req.query;
    const offset = ((parseInt(page) - 1) * itemsPerPage)

    getJourneysData(itemsPerPage, offset).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    })
}