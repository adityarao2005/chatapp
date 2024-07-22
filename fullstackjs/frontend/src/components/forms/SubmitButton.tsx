
export default function SubmitButton(props: React.PropsWithChildren<{}>) {
    return (
        <button type="submit" className="rounded-lg px-2 text-white bg-blue-600 font-bold py-1">{props.children}</button >
    );

}