'use client';

import { ServiceInfo } from '../lib/types';
import ServiceInterfaceHeader from './ServiceInterfaceHeader';

interface props {
  serviceInfo: ServiceInfo;
}

export default function ServiceInterface({ serviceInfo }: props) {
  return (
    <main className={'w-full h-full flex flex-col p-4 gap-3'}>
      <ServiceInterfaceHeader serviceName={serviceInfo.name}/>

      <section className={'h-full flex gap-3'}>
        <div className={'h-full w-1/6 flex flex-col gap-3'}>
          {serviceInfo.inputtable.map((input, i) => {
            if (input.type === 'BUTTON') {
              if (i !== 1) {
                return (
                  <button
                    className={
                      'bg-amber-500 h-full rounded-3xl rounded-tl-[120px] text-black font-bold text-4xl relative'
                    }
                    key={i}
                  >
                    <span className="absolute bottom-4 right-6">{input.name}</span>
                  </button>
                );
              } else {
                return (
                  <button
                    className={
                      'bg-amber-500 h-full rounded-3xl text-black font-bold text-4xl relative'
                    }
                    key={i}
                  >
                    <span className="absolute bottom-4 right-6">{input.name}</span>
                  </button>
                );
              }
            }
          })}
        </div>
      </section>
    </main>
  );
}
