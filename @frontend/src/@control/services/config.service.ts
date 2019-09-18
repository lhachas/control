import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

// Create the injection token for the custom settings
export const CONTROL_CONFIG = new InjectionToken('controlCustomConfig');

@Injectable({
    providedIn: 'root'
})
export class ControlConfigService
{
    // Private
    private _configSubject: BehaviorSubject<any>;
    private readonly _defaultConfig: any;

    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    constructor(
        private _platform: Platform,
        private _router: Router,
        @Inject(CONTROL_CONFIG) private _config
    )
    {
        // Set the default config from the user provided config (from forRoot)
        this._defaultConfig = _config;

        // Initialize the service
        this._init();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set and get the config
     */
    set config(value)
    {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();

        // Merge the new config
        config = _.merge({}, config, value);

        // Notify the observers
        this._configSubject.next(config);
    }

    get config(): any | Observable<any>
    {
        return this._configSubject.asObservable();
    }

    /**
     * Get default config
     *
     * @returns {any}
     */
    get defaultConfig(): any
    {
        return this._defaultConfig;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void
    {
        /**
         * Deshabilite las barras de desplazamiento personalizadas si el navegador es móvil
         */
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this._defaultConfig.customScrollbars = false;
        }

        // Establecer la configuración desde la configuración predeterminada
        this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

        // Vuelva a cargar la configuración de diseño predeterminada en cada evento RoutesRecognized
        // si la configuración de diseño actual es diferente de la predeterminada
        this._router.events
            .pipe(filter(event => event instanceof ResolveEnd))
            .subscribe(() => {
                if ( !_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout) )
                {
                    // Clonar la configuración actual
                    const config = _.cloneDeep(this._configSubject.getValue());

                    // Restablecer el diseño desde la configuración predeterminada
                    config.layout = _.cloneDeep(this._defaultConfig.layout);

                    // Establecer la configuración
                    this._configSubject.next(config);
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    setConfig(value, opts = {emitEvent: true}): void
    {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();

        // Merge the new config
        config = _.merge({}, config, value);

        // If emitEvent option is true...
        if ( opts.emitEvent === true )
        {
            // Notify the observers
            this._configSubject.next(config);
        }
    }

    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any>
    {
        return this._configSubject.asObservable();
    }

    /**
     * Reset to the default config
     */
    resetToDefaults(): void
    {
        // Set the config from the default config
        this._configSubject.next(_.cloneDeep(this._defaultConfig));
    }
}

