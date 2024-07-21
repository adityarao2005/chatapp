import React from "react";
import CardContainer from "@/components/CardContainer";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";

export default function RegisterPage() {
    return (
        <CardContainer>
            <div className="bg-white rounded p-10 m-10 space-y-5">
                <h1 className="text-3xl font-bold">My Chat App</h1>
                <h1 className="text-2xl font-bold">Register</h1>
                <form className="space-y-2">
                    <div className="space-x-2">
                        <label>Enter Name:</label>
                        <FormInput type="text" placeholder="Name" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter User Name:</label>
                        <FormInput type="text" placeholder="Username" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Email:</label>
                        <FormInput type="email" placeholder="Email" />
                    </div>
                    <div className="space-x-2">
                        <label>Enter Password:</label>
                        <FormInput type="password" placeholder="Password" />
                    </div>
                    <div className="space-x-2">
                        <label>Confirm Password:</label>
                        <FormInput type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="flex flex-col">
                        <label>Enter Your Bio:</label>
                        <textarea placeholder="Some stuff about you" className="border-2 min-h-28 rounded-xl px-1 py-1" />
                    </div>
                    <div className="space-x-2">
                        <label className="font-bold">Submit:</label>
                        <SubmitButton py={1}>Sign Up</SubmitButton>
                    </div>
                </form>
            </div>
        </CardContainer>
    );
}