import MainPage from './components/MainPage';
import { getServices } from './lib/connectorClient';
import { getMinipages } from './lib/strapiClient';
import { initContent } from './lib/structures';

export default async function Home() {
  const runningServices = (await getServices()).data;
  const minipages = await getMinipages();
  
  const content = initContent(minipages, runningServices);
  
  return(
    <MainPage content={content}/>
  );
}
