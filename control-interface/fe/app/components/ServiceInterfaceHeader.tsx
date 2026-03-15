'use client';

import Link from 'next/link';

interface props {
  serviceName: string;
}

export default function ServiceInterfaceHeader({serviceName}: props) {
  return (
    <section className={'h-[12%] w-full flex gap-3'}>
      <div className={'h-full w-1/5 flex flex-col flex-nowrap justify-items-start gap-3'}>
        <Link
          className={
            'bg-blue-300 h-full w-full rounded-3xl rounded-bl-[120px] text-black font-bold text-4xl relative'
          }
          href={'/'}
        >
          <span className="absolute bottom-4 right-6">DOMŮ</span>
        </Link>
      </div>

      <div className={'h-full w-full flex flex-col gap-3'}>
        <div className={'h-1/2'}/>
        <div className={'h-1/2 flex gap-3'}>
          <div className={'h-full flex-4 bg-amber-400 rounded-l-3xl'}></div>
          <span className={'text-4xl text-amber-200 font-bold flex-3'}>{serviceName}</span>
          <div className={'h-full flex-1 bg-amber-400 rounded-r-3xl'}></div>
        </div>
      </div>
    </section>
  );
}
