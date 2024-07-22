'use client'
import React from "react";
import Link from 'next/link';
import CardContainer from "@/components/CardContainer";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";
import { submitLogin } from "@/app/login/action";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

const initialState = {
    message: '',
    errors: [],
    success: false
};


export default function LoginPage() {
    const [state, formAction] = useFormState(submitLogin, initialState);

    if (state?.success == true) {
        console.log(state.message);
        localStorage.setItem('token', state.message);
        redirect("/app");
    }

    return (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Login</h1>
                <div className='text-red-500'>
                    {state?.errors?.map((error, index) => (<p>{error}</p>))}
                </div>
                <form className="space-y-2" action={formAction}>
                    <div className="space-x-2">
                        <label>Enter User ID:</label>
                        <FormInput type="text" placeholder="Username/Email" name="userid" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Password:</label>
                        <FormInput type="password" placeholder="Password" name="password" />
                    </div>
                    <div className="space-x-2">
                        <label className="font-bold">Submit:</label>
                        <SubmitButton>Login</SubmitButton>
                    </div>
                </form>
                <div>
                    <div><Link href="/forgot-password" className="text-blue-400">Forgot Password</Link></div>
                    <div>Dont have an account? <Link href="/register" className="text-blue-400">Sign up</Link></div>
                </div>
            </div>
        </CardContainer>
    );
}