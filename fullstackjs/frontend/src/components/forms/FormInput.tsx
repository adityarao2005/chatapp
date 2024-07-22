export default function FormInput(props: { type: string, placeholder?: string, name?: string }) {
    return (
        <input type={props.type} placeholder={props.placeholder} name={props.name} className="border-2 rounded-xl px-1 py-1" />
    );
}