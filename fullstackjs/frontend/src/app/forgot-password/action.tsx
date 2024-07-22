"use server"

export async function sendPasswordEmail(prevState: any, formData: FormData) {
    const email = formData.get("email");

    if (!email || email.toString().trim().length == 0) {
        return {
            message: 'Please enter an email',
            errors: ["Please enter an email"],
            success: false
        };
    }

    if (!email.toString().includes("@") && email.toString().split("@").length != 2) {
        return {
            message: 'Please enter a valid email',
            errors: ["Please enter a valid email"],
            success: false
        };
    }

    return {
        message: 'Email sent',
        errors: [],
        success: true
    }
}