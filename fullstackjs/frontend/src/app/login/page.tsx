import React from "react";
import Link from 'next/link';
import CardContainer from "@/components/CardContainer";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";

export default function LoginPage() {
    return (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Login</h1>
                <form className="space-y-2">
                    <div className="space-x-2">
                        <label>Enter User ID:</label>
                        <FormInput type="text" placeholder="Username/Email" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Password:</label>
                        <FormInput type="password" placeholder="Password" />
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