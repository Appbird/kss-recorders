/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_recordModify} from './IReceivedDataAtServer_recordModify';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"useDefaults":false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_recordModify};
export const IReceivedDataAtServer_recordModifySchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "LanguageInApplication": {
      "enum": [
        "English",
        "Japanese"
      ],
      "type": "string"
    },
    "RecordPropertiesInModifiable": {
      "properties": {
        "link": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "note": {
          "type": "string"
        },
        "regulation": {
          "properties": {
            "abilityIDs": {
              "items": {
                "type": "string"
              },
              "type": "array"
            },
            "gameSystemEnvironment": {
              "properties": {
                "gameDifficultyID": {
                  "type": "string"
                }
              },
              "required": [
                "gameDifficultyID"
              ],
              "type": "object"
            },
            "targetID": {
              "type": "string"
            }
          },
          "required": [
            "abilityIDs",
            "gameSystemEnvironment",
            "targetID"
          ],
          "type": "object"
        },
        "score": {
          "type": "number"
        },
        "tagName": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "required": [
        "link",
        "note",
        "regulation",
        "score",
        "tagName"
      ],
      "type": "object"
    }
  },
  "properties": {
    "IDToken": {
      "type": "string"
    },
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
    "language": {
      "$ref": "#/definitions/LanguageInApplication"
    },
    "reason": {
      "type": "string"
    },
    "recordID": {
      "type": "string"
    },
    "recordModified": {
      "$ref": "#/definitions/RecordPropertiesInModifiable"
    }
  },
  "required": [
    "IDToken",
    "gameSystemEnv",
    "language",
    "recordID",
    "recordModified"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isIReceivedDataAtServer_recordModify = ajv.compile(IReceivedDataAtServer_recordModifySchema) as ValidateFunction<IReceivedDataAtServer_recordModify>;
export default function validate(value: unknown): IReceivedDataAtServer_recordModify {
  if (isIReceivedDataAtServer_recordModify(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_recordModify.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_recordModify'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
