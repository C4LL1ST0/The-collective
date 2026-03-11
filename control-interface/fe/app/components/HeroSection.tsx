import { Presentable } from '../lib/structures';

interface MainHeroSectionProps {
  content: Presentable[];
  pageNum: number;
}

export default function HeroSection({ content, pageNum }: MainHeroSectionProps) {

  if(content[pageNum-1].page){
    return (
      <div className={'w-full h-full flex flex-col justify-start items-start'}>
        <div className={'w-full rounded-3x flex flex-col items-start p-10 gap-6'}>
          <span className={'font-bold text-6xl'}>{content[pageNum - 1].page?.title}</span>
          {content[pageNum - 1].page?.figures && (
            <img
              className={'w-2/3'}
              src={process.env.STRAPI_BASE_URL + content[pageNum - 1].page!.figures[0].url}
              alt={content[pageNum - 1].page?.figures[0].caption}
            />
          )}
          <p className={'text-2xl'}>{content[pageNum - 1].page?.description}</p>
        </div>
      </div>
    );
  }else{
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
