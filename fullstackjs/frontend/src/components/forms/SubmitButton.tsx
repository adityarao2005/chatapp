
export default function SubmitButton({ py = 0, children }: React.PropsWithChildren<{ py?: number }>) {
    const baseStyle = `rounded-lg px-2 text-white bg-blue-600 font-bold py-${py}`;
    return (
        <button type="submit" className={baseStyle}>{children}</button >
    );

}