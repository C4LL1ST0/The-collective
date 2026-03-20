'use client';

import Navigation from './Navigation';
import HeroSection from './HeroSection';
import { useEffect, useState } from 'react';
import { Presentable } from '../lib/structures';

interface props {
  content: Presentable[];
}

export default function MainPage({ content }: props) {
  const [pageNum, setPageNum] = useState(1);
  const [redirect, setRedirect] = useState<string>();
  const [port, setPort] = useState<number>();

  useEffect(() => { 
    if(content.length > 0){
      setRedirect(content[pageNum - 1].service?.name);
      setPort(content[pageNum - 1].service?.port);
    }
  }, [content, pageNum]);

  return (
    <section className={'h-screen w-screen'}>
      <Navigation
        pagination={{
          pageNum: pageNum,
          setPageNum: setPageNum,
          maxPages: content.length,
        }}
        redirect={redirect}
        servicePort={port}
      >
        <HeroSection pageNum={pageNum} content={content} />
      </Navigation>
    </section>
  );
}
