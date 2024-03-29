/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import {IReceivedDataAtServer_recordSearch} from './IReceivedDataAtServer_recordSearch';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"useDefaults":false});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {IReceivedDataAtServer_recordSearch};
export const IReceivedDataAtServer_recordSearchSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "IGameSystemEnvironment": {
      "properties": {
        "gameDifficultyID": {
          "type": "string"
        },
        "gameModeID": {
          "type": "string"
        },
        "gameSystemID": {
          "type": "string"
        }
      },
      "required": [
        "gameDifficultyID",
        "gameModeID",
        "gameSystemID"
      ],
      "type": "object"
    },
    "IRegulation": {
      "properties": {
        "abilitiesAttributeIDs": {
          "items": {
            "items": {
              "properties": {
                "attributeID": {
                  "type": "string"
                },
                "onFlagIDs": {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              },
              "required": [
                "attributeID",
                "onFlagIDs"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "type": "array"
        },
        "abilityIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "gameSystemEnvironment": {
          "$ref": "#/definitions/IGameSystemEnvironment"
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
    "ISentRecordOffer": {
      "properties": {
        "languageOfTagName": {
          "$ref": "#/definitions/LanguageInApplication"
        },
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
          "$ref": "#/definitions/IRegulation"
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
        "languageOfTagName",
        "link",
        "note",
        "regulation",
        "score",
        "tagName"
      ],
      "type": "object"
    },
    "LanguageInApplication": {
      "enum": [
        "English",
        "Japanese"
      ],
      "type": "string"
    },
    "OrderOfRecordArray": {
      "enum": [
        "EarlierFirst",
        "HigherFirst",
        "LaterFirst",
        "LowerFirst"
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
    },
    "SearchCondition": {
      "properties": {
        "abilityIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "abilityIDsCondition": {
          "description": "能力カテゴリを用いた記録検索において、And検索を行うかOr検索を行うか",
          "enum": [
            "AND",
            "AllowForOrder",
            "OR"
          ],
          "type": "string"
        },
        "gameSystemEnv": {
          "properties": {
            "gameDifficultyID": {
              "description": "//#NOTE これによる指定は、targetIDsによるものよりも強い指定となる",
              "type": "string"
            },
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
        "groupName": {
          "type": "string"
        },
        "groupSubName": {
          "type": "string"
        },
        "language": {
          "$ref": "#/definitions/LanguageInApplication"
        },
        "limitOfRecordArray": {
          "type": "number"
        },
        "orderOfRecordArray": {
          "$ref": "#/definitions/OrderOfRecordArray"
        },
        "runnerIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "searchTypeForVerifiedRecord": {
          "enum": [
            "All",
            "OnlyUnverified",
            "OnlyVerified"
          ],
          "type": "string"
        },
        "startOfRecordArray": {
          "type": "number"
        },
        "tagIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "targetIDs": {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      },
      "required": [
        "gameSystemEnv",
        "groupName",
        "language",
        "orderOfRecordArray"
      ],
      "type": "object"
    }
  },
  "properties": {
    "condition": {
      "items": {
        "$ref": "#/definitions/SearchCondition"
      },
      "type": "array"
    }
  },
  "required": [
    "condition"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isIReceivedDataAtServer_recordSearch = ajv.compile(IReceivedDataAtServer_recordSearchSchema) as ValidateFunction<IReceivedDataAtServer_recordSearch>;
export default function validate(value: unknown): IReceivedDataAtServer_recordSearch {
  if (isIReceivedDataAtServer_recordSearch(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isIReceivedDataAtServer_recordSearch.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'IReceivedDataAtServer_recordSearch'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
