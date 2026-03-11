import { Minipage, Service } from './types';

export interface Presentable {
  page?: Minipage;
  service?: Service;
}

export function initContent(pages?: Minipage[], services?: Service[]) {
  const presentablesDict: Map<string, Presentable> = new Map();

  if(pages){
    for (const page of pages) {
      presentablesDict.set(page.tname, { page });
    }
  }
  
  if(services){
    for (const service of services) {
      const name = service.name.split(':')[0];
      if (presentablesDict.has(name)) {
        const presentable = presentablesDict?.get(name);
        if (!presentable) continue;
        presentable.service = service;
      } else {
        presentablesDict.set(name, { service });
      }
    }
  }
  
  return [...presentablesDict.values()];
}

export function hasService(presentable: Presentable){
  return !!presentable.service;
}