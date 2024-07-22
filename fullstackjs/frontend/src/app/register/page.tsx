"use client"
import React from "react";
import CardContainer from "@/components/CardContainer";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";
import Link from "next/link";
import { submitRegister } from "@/app/register/action";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

const initialState = {
    message: '',
    errors: [],
    success: false
};


export default function RegisterPage() {
    const [state, formAction] = useFormState(submitRegister, initialState);

    return (state?.success ? (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Registration Complete</h1>
                <div>
                    <div>Thank you for registering. Please check your <Link href={`/verify-user/${state.message}`}>email</Link> to verify your account</div>
                </div>
                <div>
                    <div><Link href="/login" className="text-blue-400">Login</Link> once you've verified your account.</div>
                </div>
            </div>
        </CardContainer>) : (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Register</h1>
                <div className='text-red-500'>
                    {state?.errors?.map((error, index) => (<p>{error}</p>))}
                </div>
                <form className="space-y-2" action={formAction}>
                    <div className="space-x-2">
                        <label>Enter Name:</label>
                        <FormInput type="text" placeholder="Name" name="name" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter User Name:</label>
                        <FormInput type="text" placeholder="Username" name="username" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Email:</label>
                        <FormInput type="email" placeholder="Email" name="email" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Password:</label>
                        <FormInput type="password" placeholder="Password" name="password" />
                    </div>
                    <div className="space-x-2">
                        <label>Confirm Password:</label>
                        <FormInput type="password" placeholder="Confirm Password" name="confirm-password" />
                    </div>
                    <div className="flex flex-col">
                        <label>Enter Your Bio:</label>
                        <textarea placeholder="Some stuff about you" name="bio" className="border-2 min-h-28 rounded-xl px-1 py-1" />
                    </div>
                    <div className="space-x-2">
                        <label className="font-bold">Submit:</label>
                        <SubmitButton>Sign Up</SubmitButton>
                    </div>
                    <div>
                        <div>Already have an account? <Link href="/login" className="text-blue-400">Login</Link></div>
                    </div>
                </form>
            </div>
        </CardContainer>)
    );
}