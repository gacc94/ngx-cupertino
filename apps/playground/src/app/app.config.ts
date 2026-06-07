import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideCupertino } from "@ngx-cupertino/core";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes), provideCupertino({ theme: "auto" })],
};
