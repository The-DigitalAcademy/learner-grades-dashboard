import Link from 'next/link';
import NavLinks from './dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// import { signOut } from '@/auth';

export default function SideNav() {
    return (
        <aside className="flex h-full flex-col  py-4 border-r border-gray-200">
            <div className='pb-5 border-b border-gray-200'>
                <Image
                    src="/shaper-full-logo-horizontal.webp"
                    className="block w-full px-3"
                    width={600}
                    height={400}
                    alt="shaper full logo" />
                <p className='text-sm font-medium px-3 mt-1'>Learner Grades Dashbaord</p>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                <form
                //   action={async () => {
                //     'use server';
                //     await signOut({ redirectTo: '/' });
                //   }}
                >
                    <button className="w-full cursor-pointer py-2.5 flex gap-2 pl-3 hover:transition-[background] text-[15px] hover:duration-300 relative hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70">
                        <PowerIcon className="w-5" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </aside>
    );
}
