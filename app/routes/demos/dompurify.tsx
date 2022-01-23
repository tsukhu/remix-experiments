import { MetaFunction, LinksFunction, json, LoaderFunction, useLoaderData } from "remix";
import { sanitize } from 'isomorphic-dompurify';
import stylesUrl from "~/styles/app.css";

export const meta: MetaFunction = () => {
    return {
        title: "Dom Purify"
    };
};

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = () => {
    const review = `This restaurant is absolutely horrible. 
    The service is <b>slow</b> and the food is <i>disgusting</i>.
    <img src="/favicon.ico" />`

    // https://remix.run/api/remix#json
    return { data: sanitize(review) };
};

export default function Index() {
    const { data } = useLoaderData<{ data: string }>();
    return (
        <p dangerouslySetInnerHTML={{ __html: data }}></p>
    );
}