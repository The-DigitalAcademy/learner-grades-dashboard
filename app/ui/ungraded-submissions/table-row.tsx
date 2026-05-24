'use client'
import { extendedUngradedSubmission, UngradedSubmission } from '@/app/lib/definitions'
import clsx from 'clsx'
import moment from 'moment'
import ToggleSwitch from '../toggle-switch'
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { setSubmissionBlockedStatus, setSubmissionComment } from '@/app/lib/actions'
import { useState } from 'react'

export default function UngradedSubmissionsTableRow({ submission }: { submission: extendedUngradedSubmission }) {

    const [editComment, setEditComment] = useState(false)
    const [comment, setCommment] = useState(submission.comment)
    function handleUpdateComment() {
        setSubmissionComment(submission.id, comment.trim())
        setEditComment(!editComment)
    }

    return (
        <tr
            key={submission.id}
            className={clsx("border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition", { 'border-indigo-500': editComment })}
        >
            {/* <td className="px-5 py-3 uppercase">{submission.id}</td> */}
            <td className="px-5 py-3 max-w-45 truncate">
                <a
                    title={submission.coursename}
                    target="_blank"
                    className="hover:text-blue-500" href={submission.coursepath}>{submission.coursename}</a>
            </td>
            <td className="px-5 py-3">
                <div className="flex flex-col">
                    <a target="_blank"
                        className="hover:text-blue-500 max-w-60 truncate mb-0.5"
                        href={submission.activitypath}
                        title={submission.activityname}>
                        {submission.activityname}
                    </a>
                </div>
            </td>
            <td className="px-5 py-3">
                <span
                    className={clsx(
                        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring mr-auto",
                        { 'inset-ring-orange-600/20 text-orange-700 bg-orange-50': submission.activitytype == 'assign' },
                        { 'inset-ring-purple-600/20 text-purple-700 bg-purple-50': submission.activitytype == 'quiz' }
                    )}>
                    {submission.activitytype}
                </span>
            </td>
            <td className="px-5 py-3 max-w-45 truncate">{submission.username}</td>
            <td className="px-5 py-3">{moment(new Date(submission.timemodified * 1000)).fromNow()}</td>
            <td className="px-5 py-3">
                <ToggleSwitch defaultChecked={submission.blocked} onChange={(checked) => {
                    setSubmissionBlockedStatus(submission.id, checked)
                        .catch(err => console.log(err))
                }} /></td>
            <td className="px-5 py-3 cursor-pointer relative">
                <div className={clsx('max-w-30  w-30 truncate', { 'invisible': editComment })} onClick={() => setEditComment(true)}>{comment.trim() || <span className='text-transparent'>empty</span>}</div>
                <div className={clsx('absolute right-10 border border-gray-200 px-3 py-2 rounded bg-white shadow-xs z-10 w-64', { 'invisible': !editComment })}>
                    <div className='flex justify-between'>
                        <label className="text-md" htmlFor={`${submission.id}-comment`}>Comment</label>
                        <button onClick={() => setEditComment(false)} className='cursor-pointer'><XMarkIcon className='w-5' /></button>
                    </div>
                    <textarea id={`${submission.id}-comment`} value={comment} onChange={(e) => setCommment(e.target.value)} rows={2}
                        className="w-full resize-none border mt-1.5 mb-2 border-gray-500/30 outline-none rounded py-2.5 px-3" placeholder="write a comment..." />
                    <button disabled={submission.comment == comment} onClick={() => handleUpdateComment()}
                        className='py-1.5 px-2.5 cursor-pointer transition text-xs text-white rounded bg-slate-700 font-semibold disabled:bg-slate-300'
                    >Update</button>
                </div>
            </td>
            <td className="px-5 py-3"><a target="_blank" href={submission.gradepath}><ArrowTopRightOnSquareIcon className="w-5 text-blue-400 hover:text-blue-500" /></a></td>
        </tr >
    )
}
