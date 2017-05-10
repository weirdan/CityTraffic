import * as firebase from "firebase";
import { AppService } from "./app.service";

export class App {
    constructor(
        private $scope: ng.IScope,
        private AppService: AppService
    ) {
        this.connectToServer();
    }

    private connectToServer() {
        this.AppService.connect(this.$scope);
    }

    private auth() {
        this.AppService.authenticate();
    }

    private signOut() {
        this.AppService.signOut();
    }
}