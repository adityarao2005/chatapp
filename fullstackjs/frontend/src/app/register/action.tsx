"use server"

export async function submitRegister(prevState: any, formData: FormData) {
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const bio = formData.get("bio");

    const errors: string[] = [];

    if (!name || name.toString().trim().length == 0) {
        errors.push("Please enter a name");
    }

    if (!username || username.toString().trim().length == 0) {
        errors.push("Please enter a username");
    }

    if (!email || email.toString().trim().length == 0) {
        errors.push("Please enter an email");
    }

    if (!password || password.toString().trim().length == 0) {
        errors.push("Please enter an password");
    }

    if (errors.length > 0) {
        return {
            message: 'Login Failed',
            errors: errors,
            success: false
        };
    }

    const response = await fetch('/api/v2/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            password: password,
            bio: bio,
        })
    })
    
    if (!response.ok) {
        return {
            message: 'Login Failed',
            errors: ['An error occurred'],
            success: false
        }
    }

    const data = await response.json();

    return {
        message: `${data.token}`,
        errors: [],
        success: true
    }
}