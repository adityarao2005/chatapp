import CardContainer from "@/components/CardContainer";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";

export default function ForgotPasswordPage() {
    return (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <form className="space-x-2">
                    <label>Enter Email:</label>
                    <FormInput type="email" placeholder="Email" />
                    <SubmitButton py={1}>Send to Email</SubmitButton>
                </form>
            </div>
        </CardContainer>
    );
}