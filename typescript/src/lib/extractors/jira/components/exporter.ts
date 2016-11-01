import { IWorkItem } from '../../../core/types';
const toCSV = (workItems: IWorkItem[], stages: string[], attributes: {}, domainUrl: string, withHeader: boolean = true, config: any = {}): string => {

  if (attributes === undefined || attributes === null) {
    attributes = {};
  }

  const header = `ID,Link,Name,${stages.join(',')},Type,${Object.keys(attributes).join(',')}`;
  const body = workItems.map(item => item.toCSV(domainUrl, config)).reduce((res, cur) => `${res + cur}\n`, '');
  const csv: string = `${header}\n${body}`;
  return csv;
};

const toSerializedArray = (workItems: IWorkItem[], stages: string[], attributes: {}, withHeader: boolean = true): string => {
  const header = `["ID","Link","Name",${stages.map(stage => `"${stage}"`).join(',')},"Type",${Object.keys(attributes).map(attribute => `"${attribute}"`).join(',')}]`;
  const body = workItems.map(item => item.toSerializedArray()).reduce((res, cur) => `${res},\n${cur}`, '');
  const serializedData: string = `[${header}${body}]`;
  return serializedData;
};

export {
  toCSV, 
  toSerializedArray,
}