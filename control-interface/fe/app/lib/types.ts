export interface ApiMinipageRes {
  data: Minipage[];
}

export interface Minipage {
  title: string;
  description: string;
  tname: string;
  figures: Figure[];
}

export interface Figure {
  caption: string;
  url: string;
}

export interface AliveDTO {
  data: boolean;
}

export interface ServiceInfo {
  name: string;
  inputtable: Input[];
}

export interface InfoDTO {
  data: ServiceInfo
}

export interface Input {
  name: string;
  type: 'BUTTON';
  output: 'TEXT';
}

export interface Service{
  name: string;
  port: number;
}

export interface ServicesDTO{
  data: Service[];
}