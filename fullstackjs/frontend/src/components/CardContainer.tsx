export default function CardContainer(props: React.PropsWithChildren<{}>) {
    return (
        <div className="flex flex-row h-screen bg-gray-400" >
            <div className="flex-1" > </div>
            < div className="flex flex-col" >
                <div className='flex-1' > </div>
                {props.children}
                <div className='flex-1' > </div>
            </div>
            < div className="flex-1" > </div>
        </div>
    );
}