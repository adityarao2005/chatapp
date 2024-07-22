"use server"

export async function submitLogin(prevState: any, formData: FormData) {
    const userid = formData.get("userid");
    const password = formData.get("password");
    const errors: string[] = [];

    if (!userid || userid.toString().trim().length == 0) {
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

    const response = await fetch('http://localhost:3000/api/v2/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid,
            password: password
        })
    });

    if (response.status != 200) {
        errors.push("Login Failed");
    }

    const data = await response.json();
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;

    return {
        message: `${accessToken}:${refreshToken}`,
        errors: [],
        success: true
    }
}