import Button from "./button";


export default function LoginForm() {
    return (
        <form className="rounded-lg border border-gray-200 p-10 w-full">
            <h1 className="text-xl font-semibold mb-5">Please log in to continue</h1>
            <div className="w-full">
                <div className="mb-5">
                    <label
                        className="mb-2 block text-sm font-medium test-gray-900"
                        htmlFor="email">Email</label>
                    <input
                        className="block w-full rounded-md border border-gray-300 text-gray-900 p-2.5 placeholder:text-gray-500"
                        type="email"
                        placeholder="name@email.com"
                        required />
                </div>
                <div className="mb-5">
                    <label
                        className="mb-3 block text-sm font-medium test-gray-900"
                        htmlFor="password">Password</label>
                    <input
                        className="block w-full rounded-md border border-gray-300 text-gray-900 p-2.5 placeholder:text-gray-500"
                        type="password" />
                </div>
                <Button>
                    Log in
                </Button>
            </div>
        </form>
    )
}
