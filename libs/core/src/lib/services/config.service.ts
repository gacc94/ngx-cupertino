import { Injectable, inject, signal } from "@angular/core";
import { CUP_CONFIG } from "../providers/cupertino.provider";

@Injectable({ providedIn: "root" })
export class CupConfigService {
    readonly config = signal(inject(CUP_CONFIG));
}
