'use client';

import { useState } from 'react';
import { pressButton, pressTextButton } from '../lib/connectorClient';
import { Input, ServiceInfo } from '../lib/types';
import ServiceInterfaceHeader from './ServiceInterfaceHeader';

interface props {
  serviceInfo: ServiceInfo;
}

export default function ServiceInterface({ serviceInfo }: props) {
  const [outputs, setOutputs] = useState(new Map<string, string[]>());

  const handleButtonClick = async (input: Input) => {
    if (input.output === 'TEXT') {
      const text = await pressTextButton(input.name, serviceInfo.port);

      setOutputs((prev) => {
        const newMap = new Map(prev);
        let oldArr = prev.get(input.name) ?? [];
        if(oldArr.length > 3) oldArr = oldArr.slice(3);
        const newArr = [...oldArr, text];
        newMap.set(input.name, newArr);
        return newMap;
      });
    } else if (input.output === 'NONE') {
      await pressButton(input.name, serviceInfo.port);
    }
    console.log(outputs);
  };

  return (
    <main className={'w-full h-full flex flex-col p-4 gap-3'}>
      <ServiceInterfaceHeader serviceName={serviceInfo.name} />

      <section className={'h-full flex gap-3'}>
        <div className={'h-full w-1/5 flex flex-col gap-3'}>
          {serviceInfo.inputtable
            .filter((input) => input.type === 'BUTTON')
            .map((input, i) => {
              if (i === 0) {
                return (
                  <button
                    className={
                      'bg-amber-500 h-full rounded-3xl rounded-tl-[120px] text-black font-bold text-4xl relative cursor-grab'
                    }
                    key={input.name}
                    onClick={() => handleButtonClick(input)}
                  >
                    <span className="absolute bottom-4 right-6">{input.name}</span>
                  </button>
                );
              } else {
                return (
                  <button
                    className={
                      'bg-amber-500 h-full rounded-3xl text-black font-bold text-4xl relative cursor-grab'
                    }
                    key={input.name}
                    onClick={() => handleButtonClick(input)}
                  >
                    <span className="absolute bottom-4 right-6">{input.name}</span>
                  </button>
                );
              }
            })}
        </div>

        <div className={'w-full h-full flex gap-3 p-10'}>
          {Array.from(outputs.entries()).map(([key, val]) => {
            return (
              <div key={key} className={'h-full max-w-1/2 flex flex-col gap-3 flex-1'}>
                <span className={'font-bold text-4xl'}>{key}</span>
                {val.map((p, i) => {
                  return (
                    <p key={i} className={'text-l'}>
                      {p}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
