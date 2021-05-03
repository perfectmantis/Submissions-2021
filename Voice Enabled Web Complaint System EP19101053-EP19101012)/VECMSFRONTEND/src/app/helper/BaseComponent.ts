import { MatDialog, MatSnackBar } from "@angular/material";
import { GlobalConfig } from "./GlobalConfig";
import { data } from "jquery";
import { ConfirmationdialogComponent } from "../components/confirmationdialog/confirmationdialog.component";
import { GeneralService } from "../services/general.service";
import {  Router } from "@angular/router";



export class BaseComponent {

    MatDialog: MatDialog;
    snackBar: MatSnackBar;
    GeneralService: GeneralService;
    localcontent: any;
    private router: Router;
    constructor() {
        this.MatDialog = GlobalConfig.injector.get(MatDialog);
        this.snackBar = GlobalConfig.injector.get(MatSnackBar);
        this.GeneralService = GlobalConfig.injector.get(GeneralService);
        this.router = GlobalConfig.injector.get(Router);
        this.GetLocalStorageItem();
    }
    GetLocalStorageItem() {
        const localstoragedata = localStorage.getItem('appkey');
        this.localcontent = JSON.parse(localstoragedata);
    }
    private showSnakMessages(message: string, action?: string) {
        let snackbar = this.snackBar.open(message, action ? "action" : "Ok", {
            duration: 5000,
            panelClass: ['danger']
        });
    }
    showsucess(message: string, action?: string) {
        let snackbar = this.snackBar.open(message, action, {
            duration: 5000,
            panelClass: ['blue-snackbar']
        });
    }
    showSnakMessage(messages: string | any, action?: string) {
        let msg = '';
        if (messages) {
            if (typeof messages == 'string') {
                msg += messages;
            }
            else {
                messages.forEach(error => {
                    msg += error + '\n';

                })
            }
            this.showSnakMessages(msg);
        }
    }
    Navigate(url: string) {
        this.router.navigate([url]);

    }
    
    NavigateParam(url: string,params:any) {
        this.router.navigate([url,params]);

    }

    // ShowConfirmation(action): boolean {
    //     let dialogref = this.MatDialog.open(ConfirmationdialogComponent, { data: { action: action }, minWidth: '300px' ,disableClose: true });
    //     dialogref.afterClosed().subscribe(result => {
    //       //  debugger;
    //         if (result) {
    //             return true;
    //         }
    //         else
    //             return false;
    //     })
    //     return false;
    // }
}