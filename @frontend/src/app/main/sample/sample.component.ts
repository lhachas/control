import { Component } from '@angular/core';

import { ControlTranslationLoaderService } from '@control/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    /**
     * Constructor
     *
     * @param {ControlTranslationLoaderService} _controlTranslationLoaderService
     */
    constructor(
        private _controlTranslationLoaderService: ControlTranslationLoaderService
    )
    {
        this._controlTranslationLoaderService.loadTranslations(english, turkish);
    }
}
