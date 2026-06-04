import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: "", loadComponent: () => import("./pages/home/home-page").then((m) => m.HomePage) },
    { path: "button", loadComponent: () => import("./pages/button/button-page").then((m) => m.ButtonPage) },
    { path: "toggle", loadComponent: () => import("./pages/toggle/toggle-page").then((m) => m.TogglePage) },
    {
        path: "text-field",
        loadComponent: () => import("./pages/text-field/text-field-page").then((m) => m.TextFieldPage),
    },
    { path: "slider", loadComponent: () => import("./pages/slider/slider-page").then((m) => m.SliderPage) },
    { path: "stepper", loadComponent: () => import("./pages/stepper/stepper-page").then((m) => m.StepperPage) },
    { path: "progress", loadComponent: () => import("./pages/progress/progress-page").then((m) => m.ProgressPage) },
];
