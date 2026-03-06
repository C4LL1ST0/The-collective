import MainPage from './components/MainPage';
import { getMinipages } from './lib/strapiClient';

export default async function Home() {
  const minipages = await getMinipages();

  return(
    <MainPage minipages={minipages}/>
  );
}
