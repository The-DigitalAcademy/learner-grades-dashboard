import { Metadata } from "next";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
    title: 'Login | Learner Grades Dashboard'
}

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen mx-auto">
            <LoginForm />
        </main>
    )
}
