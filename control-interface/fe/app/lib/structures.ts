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
      if (presentablesDict.has(service.name)) {
        const presentable = presentablesDict?.get(service.name);
        if (!presentable) continue;
        presentable.service = service;
      } else {
        presentablesDict.set(service.name, { service });
      }
    }
  }
  
  return [...presentablesDict.values()];
}