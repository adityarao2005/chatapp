'use client'
import CardContainer from "@/components/CardContainer";
import SubmitButton from "@/components/forms/SubmitButton";
import Link from "next/link";
import { sendPasswordEmail } from "@/app/forgot-password/action";
import { useFormState } from "react-dom";

const initialState = {
    message: '',
    errors: [],
    success: false
};

export default function ForgotPasswordPage() {
    const [state, formAction] = useFormState(sendPasswordEmail, initialState);


    return (state?.success ? (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Success! Change Password Email Sent</h1>
                <div>
                    You may now go to your email.<br /> A link to change your password has been sent to you.<br /> Once you have gone there and changed your password, you may come back here and <Link href="/login" className="text-blue-400">login</Link>.
                </div>
            </div>
        </CardContainer>
    )
        : (
            <CardContainer>
                <div className="bg-white rounded p-10 m-10 space-y-5">
                    <h1 className="text-3xl font-bold">My Chat App</h1>
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <div className='text-red-500'>
                        {state?.errors?.map((error, index) => (<p>{error}</p>))}
                    </div>
                    <form action={formAction}>
                        <label className="mr-2">Enter Email:</label>
                        <input type="email" placeholder="Email" name="email" className="border-2 rounded-xl px-1 py-1 mr-2" />
                        <SubmitButton>Send to Email</SubmitButton>
                    </form>
                    <div>
                        <div>Don't have an account? <Link href="/register" className="text-blue-400">Register</Link></div>
                        <div>Know your password? <Link href="/login" className="text-blue-400">Login</Link></div>
                    </div>
                </div>
            </CardContainer>)
    );
}