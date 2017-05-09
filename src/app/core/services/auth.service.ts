import { User } from "../entities/user";

export interface IAuthProvider {

}

export interface IAuthResponse {

}

export interface IAuthService {
    (authProvider: IAuthProvider): Promise<IAuthResponse>;
}

export class AuthService {
    private user: User;
    constructor(private localStorageService: ng.local.storage.ILocalStorageService, private CoreConstants: any) {
        this.user = this.initiateUser();
    }

    initiateUser(): User {
        const user = this.localStorageService.get("User");
        let localStorageUser: User = new User(user || {});
        return localStorageUser;
    }

    isLoggedIn() {
        return Boolean(this.getToken());
    }

    authorize(user: User, remember: boolean): void {
        this.user = user;
        if (remember) {
            this.localStorageService.set("User", this.user);
            this.localStorageService.set("Token", this.user.token);
        }
    }

    login(service: IAuthService,
        provider: IAuthProvider = this.CoreConstants.AUTH.PROVIDERS.DEFAULT,
        data?: any): Promise<IAuthResponse> {
        return service(provider);
    }

    getUser() {
        return this.user;
    }


    getToken() {
        return this.user.token || this.localStorageService.get("Token");
    }
}