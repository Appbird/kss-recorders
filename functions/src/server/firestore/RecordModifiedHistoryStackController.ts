import { ModifiedHistoryStack } from "../../../../src/ts/type/record/IRecord";
import { PartialValueWithFieldValue, Transaction } from "../function/firebaseAdmin";
import { firestoreCollectionUtility } from "./FirestoreCollectionUtility";
import { IFirestoreCollectionController, WithoutID } from "./IFirestoreCollectionController";

type HandledType = ModifiedHistoryStack

export class RecordModifiedHistoryStackController implements IFirestoreCollectionController<HandledType> {
    readonly ref: FirebaseFirestore.CollectionReference;
    constructor(gameSystemID:string,gameModeID:string,recordID:string,
        private transaction?:Transaction    
    ) {
        this.ref = firestoreCollectionUtility.getGameModeItemRef(gameSystemID,gameModeID).collection("records").doc(recordID).collection("modifiedHistoryStack");
    }
    getCollection(): Promise<HandledType[]> {
        return firestoreCollectionUtility.getCollection<HandledType>(this.ref,this.transaction);
    }
    getInfo(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.getDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async add(object: WithoutID<HandledType>): Promise<void> {
        await firestoreCollectionUtility.addDoc<HandledType>(this.ref, object,this.transaction);
    }
    async modify(id: string, object: HandledType): Promise<void> {
        await firestoreCollectionUtility.modifyDoc<HandledType>(this.ref.doc(id), object,this.transaction);
    }
    delete(id: string): Promise<HandledType> {
        return firestoreCollectionUtility.deleteDoc<HandledType>(this.ref.doc(id),this.transaction);
    }
    async update(id: string, object:PartialValueWithFieldValue<HandledType>): Promise<void> {
        await firestoreCollectionUtility.updateDoc(this.ref.doc(id), object,this.transaction);
    }
    async deleteAll(): Promise<void>{
        await Promise.all((await this.ref.listDocuments()).map(doc => doc.delete()))
    }
}
