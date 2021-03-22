import { FunctionComponent } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import useFetch from "use-http";
import { Typography } from "@material-ui/core";
import daysUntil from "@utils/DaysUntil";

interface INameDay {
    day: number;
    month: number;
    name: string;
}
interface INameDayResult {
    country_code: string;
    results: INameDay[];
}

interface IProps {
    firstName: string;
}
const NameDay: FunctionComponent<IProps> = ({ firstName }) => {

    const url = "https://api.abalin.net/getdate?country=cz&name=" + encodeURI(firstName);
    const { loading, error, data } = useFetch<INameDayResult>(url, {}, []);

    if (loading) {
        return <LinearProgress />;
    }

    if (error) {
        console.log(error);
        return <strong>Error while looking for nameday.</strong>;
    }

    if (!data?.results || data.results.length < 1) {
        return <span>No nameday</span>;
    }

    const year = new Date().getFullYear();

    const text = ({ name, day, month }: INameDay, i: number): JSX.Element => {
        const date = new Date(year, month - 1, day, 0, 0, 0, 0);

        return (
            <Typography key={i}>
                {name}: {day}.{month} - {daysUntil(date)}
            </Typography>
        );
    };

    return (
        <div>
            {data.results.map(text)}
        </div>
    );
};

export default NameDay;
