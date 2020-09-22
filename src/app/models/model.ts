export interface DataModel {
  format: string;
  version: string;
  result: Result;
}

export interface Result {
  _about: string;
  definition: string;
  extendedMetadataVersion: string;
  first: string;
  hasPart: string;
  isPartOf: string;
  items: Item[];
  itemsPerPage: number;
  next: string;
  page: number;
  startIndex: number;
  type: string[];
}

export interface Item {
  _about: string;
  accessURL: string;
  byteSize?: number;
  format: string;
  title: string[] | string;
  type: string;
}
