import { Minipage } from '../lib/types';

interface MainHeroSectionProps {
  pages: Minipage[];
  pageNum: number;
}

export default function HeroSection({ pages, pageNum }: MainHeroSectionProps) {
  return (
    <div className={'w-full h-full flex flex-col justify-center items-center'}>
      <div className={'min-w-3/4 max-w-full rounded-3x flex flex-col items-center p-10 gap-6'}>
        <span className={'font-bold text-6xl'}>{pages[pageNum - 1].title}</span>
        <img
          className={'w-2/3'}
          src={process.env.STRAPI_BASE_URL + pages[pageNum - 1].figures[0].url}
          alt={pages[pageNum - 1].figures[0].caption}
        />
        <p className={'text-2xl'}>{pages[pageNum - 1].description}</p>
      </div>
    </div>
  );
}
