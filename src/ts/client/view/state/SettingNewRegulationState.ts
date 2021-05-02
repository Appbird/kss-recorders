import { IAppUsedToChangeState } from "../../interface/AppInterfaces";
import { SettingNewRegulationView } from "../parts/SetNewRegulation/SettingNewRegulationView";
import { PageStateBaseClass } from "./PageStateClass";
import firebase from "firebase/app"

export class S_SettingNewRegulationState_CollectionViewer
    extends PageStateBaseClass<firebase.firestore.CollectionReference|null,IAppUsedToChangeState>{
    init(){
        new SettingNewRegulationView(this.articleDOM.appendChild(document.createElement("div")),this.app);
    }
}
export class S_SettingNewRegulationState_DocViewer
    extends PageStateBaseClass<firebase.firestore.DocumentReference,IAppUsedToChangeState>{
    init(){
        new SettingNewRegulationView(this.articleDOM.appendChild(document.createElement("div")),this.app);
    }
}