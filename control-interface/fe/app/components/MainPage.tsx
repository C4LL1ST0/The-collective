'use client';

import { Minipage } from '../lib/types';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import { useState } from 'react';

interface props {
  minipages: Minipage[];
}

export default function MainPage({ minipages }: props) {
  const [pageNum, setPageNum] = useState(1);

  return (
    <Navigation
      pagination={{
        pageNum: pageNum,
        setPageNum: setPageNum,
        maxPages: minipages.length,
      }}
    >
      <HeroSection pages={minipages} pageNum={1} />
    </Navigation>
  );
}
