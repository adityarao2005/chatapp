import CardContainer from "@/components/CardContainer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { URLSearchParams } from "url";

export default async function VerifyUserPage() {
    const router = useRouter();
    const token = router.query.token as string;

    const response = await fetch('/api/v2/verify?' + new URLSearchParams({
        token: token
    }).toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status == 200) {
        return (
            <CardContainer>
                <div className="bg-white rounded p-10 m-10 space-y-5">
                    <h1 className="text-3xl font-bold">My Chat App</h1>
                    <h1 className="text-2xl font-bold">User Verified</h1>
                    <div>
                        <div>Thank you for verifying. You may <Link href="/login" className="text-blue-400">login</Link></div>
                    </div>
                </div>
            </CardContainer>);
    }

    redirect('/login');
}