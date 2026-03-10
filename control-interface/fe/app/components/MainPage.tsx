'use client';

import Navigation from './Navigation';
import HeroSection from './HeroSection';
import { useState } from 'react';
import { Presentable } from '../lib/structures';

interface props {
  content: Presentable[];
}

export default function MainPage({ content }: props) {
  const [pageNum, setPageNum] = useState(1);

  return (
    <section className={'h-screen w-screen'}>
      <Navigation
        pagination={{
          pageNum: pageNum,
          setPageNum: setPageNum,
          maxPages: content.length,
        }}
      >
        <HeroSection pageNum={1} content={content} />
      </Navigation>
    </section>
  );
}
