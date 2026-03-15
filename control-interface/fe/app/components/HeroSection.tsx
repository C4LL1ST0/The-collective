import { Presentable } from '../lib/structures';

interface MainHeroSectionProps {
  content: Presentable[];
  pageNum: number;
}

export default function HeroSection({ content, pageNum }: MainHeroSectionProps) {
  if (content[pageNum - 1].page) {
    return (
      <div className={'w-full h-full flex flex-col justify-start items-start p-10'}>
        <div className={'w-full rounded-3x flex flex-col items-start gap-6'}>
          <span className={'font-bold text-6xl'}>{content[pageNum - 1].page?.title}</span>
          {content[pageNum - 1].page!.figures &&
            content[pageNum - 1].page!.figures.map((fig, i) => {
              return (
                <img
                  key={i}
                  className={'w-2/3'}
                  src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + fig.url}
                  alt={fig.caption}
                />
              );
            })}
          <p className={'text-2xl'}>{content[pageNum - 1].page?.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={'w-full h-full flex flex-col justify-start items-start'}>
        <div className={'w-full rounded-3x flex flex-col items-start p-10 gap-6'}>
          <span className={'font-bold text-4xl'}>Program:</span>
          <span className={'font-bold text-6xl'}>{content[pageNum - 1].service?.name}</span>
          <span className={'font-bold text-4xl'}>Dodatečné info není k dispozici.</span>
        </div>
      </div>
    );
  }
}
