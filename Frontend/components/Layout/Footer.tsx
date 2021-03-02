
import { FunctionComponent } from "react";
import { createStyles, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
    footer: {
        height: 50,
        textAlign: "center",
    },
}),
);

const Footer: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div>
                <hr />
                <p>Contacts App &copy; 2021 <Link href="https://www.linkedin.com/in/jfalta/" title="Author" rel="noreferrer" target="_blank">Jiří Falta</Link> - <Link href="https://uhk.cz/" title="University" target="_blank" rel="noreferrer">Student&apos;s project</Link></p>
            </div>
        </footer>
    );
};

export default Footer;
