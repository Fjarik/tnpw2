import { FunctionComponent } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import useFetch from "use-http";
import { Typography } from "@material-ui/core";

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

    return (
        <div>
            {data.results.map((elm, i) => (
                <Typography key={i}>{elm.name}: {elm.day}.{elm.month}</Typography>
            ))}
        </div>
    );
};

export default NameDay;
