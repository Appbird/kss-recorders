import { APIFunctions } from "../../../../../src/ts/type/api/relation";
import { IRecordWithoutID } from "../../../../../src/ts/type/record/IRecord";
import { RecordDataBase } from "../../firestore/RecordDataBase";
import { ControllerOfTableForResolvingID } from "../../recordConverter/ControllerOfTableForResolvingID";
import { authentication } from "../foundation/auth";
import { DiscordWebhookers } from "../webhooks/discord";
import { convertTagNameToTagID } from "./convertTagNameToTagID";

export async function modify(recordDataBase:RecordDataBase,input:APIFunctions["record_modify"]["atServer"]):Promise<APIFunctions["record_write"]["atClient"]>{
    const recordBeforeModified = await recordDataBase.getRecord(input.gameSystemEnv.gameSystemID,input.gameSystemEnv.gameModeID,input.recordID)
    const {timestamp_post,runnerID,languageOfTagName} = recordBeforeModified
    const modifier = await authentication(input.IDToken);
    const result:IRecordWithoutID = {
        ...input.recordModified,
        regulation:{
            ...input.recordModified.regulation,
            gameSystemEnvironment:{
                gameDifficultyID:input.recordModified.regulation.gameSystemEnvironment.gameDifficultyID,
                gameSystemID:recordBeforeModified.regulation.gameSystemEnvironment.gameSystemID,
                gameModeID:recordBeforeModified.regulation.gameSystemEnvironment.gameModeID
            }
        },
        timestamp_post:timestamp_post,
        runnerID:runnerID,
        languageOfTagName:languageOfTagName,
        tagID:await convertTagNameToTagID(
                    input.gameSystemEnv.gameSystemID,
                    recordDataBase,
                    input.recordModified.tagName,
                    input.language),
    }
    const record = await recordDataBase.modifyRecord(input.recordID,modifier,result);
    const cotfr = new ControllerOfTableForResolvingID(recordDataBase);
    
    const recordBeforeModifiedResolved = await cotfr.convertRecordIntoRecordResolved(recordBeforeModified,input.language);
    const recordResolved = await cotfr.convertRecordIntoRecordResolved(record,input.language);
    
    const discord = new DiscordWebhookers(recordDataBase);
    await discord.sendRecordModifiedMessage(modifier,recordBeforeModifiedResolved,recordResolved)
    return {
        isSucceeded:true,
        result: recordResolved
    }
}
