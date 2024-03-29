/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_getlist_UseSIdId} from './IReceivedDataAtServer_getlist_UseSIdId';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"useDefaults":false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_getlist_UseSIdId};
export const IReceivedDataAtServer_getlist_UseSIdIdSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "gameSystemEnv": {
      "properties": {
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameSystemID"
      ],
      "type": "object"
    },
    "id": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "limit": {
      "type": "number"
    },
    "start": {
      "type": "number"
    }
  },
  "required": [
    "gameSystemEnv"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isIReceivedDataAtServer_getlist_UseSIdId = ajv.compile(IReceivedDataAtServer_getlist_UseSIdIdSchema) as ValidateFunction<IReceivedDataAtServer_getlist_UseSIdId>;
export default function validate(value: unknown): IReceivedDataAtServer_getlist_UseSIdId {
  if (isIReceivedDataAtServer_getlist_UseSIdId(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_getlist_UseSIdId.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_getlist_UseSIdId'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
