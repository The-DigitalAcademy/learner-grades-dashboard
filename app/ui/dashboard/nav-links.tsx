'use client';

import { HomeIcon, DocumentDuplicateIcon, DocumentMagnifyingGlassIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
        name: 'Ungraded Submissions',
        href: '/dashboard/ungraded-submissions',
        icon: DocumentDuplicateIcon,
    },
    {
        name: 'Autograder Logs',
        href: '/dashboard/autograder-logs',
        icon: DocumentMagnifyingGlassIcon
    },
    {
        name: 'Activity Reports',
        href: '/dashboard/activity-reports',
        icon: ChartPieIcon
    }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className='flex flex-col gap-1 py-4'>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'py-2.5 flex gap-2 pl-3 hover:transition-[background] text-[15px] hover:duration-300 relative hover:bg-zinc-100/80',
                            { 'bg-zinc-100/80': pathname === link.href },
                        )}
                    >
                        <LinkIcon className='w-5' />
                        <p className=''>{link.name}</p>
                    </Link>
                )
            })}
        </div>
    )
}
