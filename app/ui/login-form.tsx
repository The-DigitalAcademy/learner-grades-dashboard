import Image from "next/image";

export default function LoginForm() {
    return (
        <form className="flex w-full flex-col max-w-96">
            <Image
                src="/shaper-full-logo-horizontal.webp"
                className="block"
                width={1000}
                height={500}
                alt="shaper full logo" />
            <p className="mb-5 text-ll font-medium">Learner Grades Dashboard</p>

            <h1 className="text-4xl font-medium text-gray-900">Login</h1>

            <p className="mt-4 text-base text-gray-500/90">
                Please sign in to continue.
            </p>

            <div className="mt-10">
                <label className="font-medium">Email</label>
                <input
                    placeholder="Please enter your email"
                    className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                    required
                    type="email"
                    name="email"
                />
            </div>

            <div className="mt-6">
                <label className="font-medium">Password</label>
                <input
                    placeholder="Please enter your password"
                    className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                    required
                    type="password"
                    name="password"
                />
            </div>

            <button
                type="submit"
                className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
            >
                Login
            </button>
            <p className='text-center py-8'>
                Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
            </p>
            <button type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-md text-gray-800">
                <Image width={45} height={45} className="h-4 w-4" src="/google-favicon.png" alt="googleFavicon" />
                Log in with Google
            </button>
        </form>
    )
}
