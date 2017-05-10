import * as angular from "angular";

import { AuthProvidersFactory } from "./auth-providers.factory";

import { FirebaseAuthProvider } from "./firebase-auth.provider";

export const AuthProvidersModule = angular.module("app.core.providers.auth-providers", [

])
    .factory(AuthProvidersFactory.name, AuthProvidersFactory)
    .service(FirebaseAuthProvider.name, FirebaseAuthProvider);