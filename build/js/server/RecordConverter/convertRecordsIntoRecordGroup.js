"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRecordsIntoRecordGroup = void 0;
var OutputDataToClient_test_1 = require("../test/OutputDataToClient.test");
function convertRecordsIntoRecordGroup(records, info) {
    return {
        groupName: info.groupName,
        groupSubName: info.groupSubName,
        lastPost: records.sort(function (a, b) { return b.timestamp - a.timestamp; })[0].timestamp,
        numberOfRecords: info.numberOfRecords,
        numberOfRunners: info.numberOfRecords,
        records: records.map(function (record) { return convertIRecordIntoIRecordInShortWithName(record, record.regulation.gameSystemEnvironment.gameSystemID, info.lang); })
    };
}
exports.convertRecordsIntoRecordGroup = convertRecordsIntoRecordGroup;
function convertIRecordIntoIRecordInShortWithName(record, gameSystemID, lang) {
    var gr = record.regulation; //#README
    var gse = gr.gameSystemEnvironment; //#README
    var cotfr = OutputDataToClient_test_1.controllerOfTableForResolvingID; //#README
    return {
        regulation: {
            gameSystemEnvironment: {
                gameSystemID: gse.gameSystemID,
                gameModeID: gse.gameModeID,
                gameDifficultyID: gse.gameDifficultyID,
                gameSystemName: cotfr.resolveGameSystemID(gse.gameSystemID, lang),
                gameModeName: cotfr.resolveGameModeID(gse.gameSystemID, gse.gameModeID, lang),
                gameDifficultyName: cotfr.resolveGameDifficultyID(gse.gameSystemID, gse.gameDifficultyID, lang),
            },
            targetID: gr.targetID,
            targetName: cotfr.resolveTargetID(gse.gameSystemID, gr.targetID, lang),
            abilityIDsOfPlayerCharacters: gr.abilityIDsOfPlayerCharacters,
            abilityNamesOfPlayerCharacters: gr.abilityIDsOfPlayerCharacters.map(function (id) { return cotfr.resolveAbilityID(gameSystemID, id, lang); }),
        },
        score: record.score,
        runnerID: record.runnerID,
        recordID: record.recordID,
        runnerName: cotfr.resolveRunnerID(record.runnerID, lang)
    };
}
