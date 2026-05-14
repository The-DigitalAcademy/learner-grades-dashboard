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
        name: 'Activity Grade Reports',
        href: '/dashboard/activity-grade-reports',
        icon: ChartPieIcon
    }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className='flex flex-col gap-1'>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'text-sm flex items-center jsutify-center px-2 py-3 gap-2 rounded-md hover:bg-gray-50 hover:text-orange-500 hover:[&>svg]:text-orange-500',
                            { 'bg-gray-50 text-orange-500 [&>svg]:text-orange-500': pathname === link.href },
                        )}
                    >
                        <LinkIcon className='w-6 text-gray-400' />
                        <p className=''>{link.name}</p>
                    </Link>
                )
            })}
        </div>
    )
}
