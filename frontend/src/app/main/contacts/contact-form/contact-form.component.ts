import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { Contact } from 'app/main/contacts/contact.model';
import { ContactsService } from 'app/main/contacts/contacts.service';
import { TipoDocumento } from 'app/main/tipo-documento/tipo-documento.model';
import { Contribuyente } from 'control-consultas-doc';

@Component({
    selector     : 'contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent implements OnInit, OnDestroy
{
    action: string;
    contact: Contact;
    contactForm: FormGroup;
    dialogTitle: string;
    
    tipoDocumentos: TipoDocumento[];
    tipoDocumento: TipoDocumento;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _contactsService: ContactsService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Contact';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'New Contact';
            this.contact = new Contact({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async ngOnInit(): Promise<void> 
    {
        this.tipoDocumentos = await this._contactsService.getTipoDocumentos();
        this.tipoDocumento = {
            codigo: '0',
            descripcion: '',
            abreviatura: '',
            estado: ''
        } as TipoDocumento;
        console.log(this.tipoDocumentos); 
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    async consultaRuc(): Promise<Contribuyente> {
        console.log(this.contactForm.value.nroDocumento);
        const contribuyente: Contribuyente = await this._contactsService.consultaRuc(this.contactForm.value.nroDocumento);
        console.log(contribuyente);
        return contribuyente;
    }

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [ this.contact.id ],
            razonSocial     : [ this.contact.razonSocial ],
            nombreComercial : [ this.contact.nombreComercial ],
            tipo            : [ this.contact.tipo ],
            condicion       : [ this.contact.condicion ],
            tipoDocumento   : [ this.contact.tipoDocumento ],
            nroDocumento    : [ this.contact.nroDocumento ],
            ubigeo          : [ this.contact.ubigeo ],
            direccion       : [ this.contact.direccion ],
            urbanizacion    : [ this.contact.urbanizacion ],
            departamento    : [ this.contact.departamento ],
            provincia       : [ this.contact.provincia ],
            distrito        : [ this.contact.distrito ],
            telfFijo        : [ this.contact.telfFijo ],
            telfMovil       : [ this.contact.telfMovil ],
            email           : [ this.contact.email ],
            observaciones   : [ this.contact.observaciones ],
            estado          : [ this.contact.estado ]
        });
    }
}
