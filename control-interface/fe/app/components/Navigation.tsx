'use client';

import Link from 'next/link';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface props {
  pagination: { pageNum: number; setPageNum: Dispatch<SetStateAction<number>>; maxPages: number };
  redirect?: string;
  children: ReactNode;
}

export default function MainNavigation({ children, redirect: interfaceLink, pagination }: props) {
  return (
    <div className={'h-full w-full p-4'}>
      <div className={'h-full w-full bg-black flex justify-center items-center gap-3'}>
        <div className="h-full w-1/5 flex flex-col flex-nowrap self-start justify-items-start gap-3">
          <Link
            className={
              'bg-blue-300 h-full w-full rounded-3xl rounded-tl-[150px] text-black font-bold text-4xl relative'
            }
            href={'/'}
          >
            <span className="absolute bottom-4 right-6">DOMŮ</span>
          </Link>

          <Link
            className={
              'bg-amber-500 h-full w-full rounded-3xl text-black font-bold text-4xl relative'
            }
            onClick={(e) => {
              if (!interfaceLink) e.preventDefault();
            }}
            href={'/' + interfaceLink}
          >
            <span className="absolute bottom-4 right-6">VSTOUPIT</span>
          </Link>
        </div>

        <div className={'w-full h-full flex flex-col flex-nowrap gap-3'}>
          <div className={'w-full h-1/12 flex flex-nowrap self-start justify-evenly gap-3'}>
            <div
              className={
                'bg-amber-500 flex-1 h-full rounded-3xl text-black font-bold text-4xl relative'
              }
            >
              <span className="absolute bottom-4 right-6">
                {pagination.pageNum}/{pagination.maxPages}
              </span>
            </div>
            <button
              onClick={() => {
                if (pagination.pageNum > 1) pagination.setPageNum(pagination.pageNum - 1);
              }}
              className={
                'bg-amber-500 flex-5 h-full rounded-3xl text-black font-bold text-4xl relative'
              }
            >
              <span className="absolute bottom-4 right-6">ZPĚT</span>
            </button>

            <button
              onClick={() => {
                if (pagination.pageNum < pagination.maxPages)
                  pagination.setPageNum(pagination.pageNum + 1);
              }}
              className={
                'bg-amber-500 flex-5 h-full rounded-3xl text-black font-bold text-4xl relative'
              }
            >
              <span className="absolute bottom-4 right-6">DALŠÍ</span>
            </button>
          </div>

          <div className={'w-full h-full'}>{children}</div>
        </div>
      </div>
    </div>
  );
}
