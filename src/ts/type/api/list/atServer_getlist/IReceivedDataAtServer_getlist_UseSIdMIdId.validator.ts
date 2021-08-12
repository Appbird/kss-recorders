/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_getlist_UseSIdMIdId} from './IReceivedDataAtServer_getlist_UseSIdMIdId';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_getlist_UseSIdMIdId};
export const IReceivedDataAtServer_getlist_UseSIdMIdIdSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "gameSystemEnv": {
      "properties": {
        "gameModeID": {
          "type": "string"
        },
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameModeID",
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
export const isIReceivedDataAtServer_getlist_UseSIdMIdId = ajv.compile(IReceivedDataAtServer_getlist_UseSIdMIdIdSchema) as ValidateFunction<IReceivedDataAtServer_getlist_UseSIdMIdId>;
export default function validate(value: unknown): IReceivedDataAtServer_getlist_UseSIdMIdId {
  if (isIReceivedDataAtServer_getlist_UseSIdMIdId(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_getlist_UseSIdMIdId.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_getlist_UseSIdMIdId'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
