import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/shared/services/base.service';
import { Subscription, Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { Program } from 'src/app/shared/models/Programs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from 'src/app/shared/services/program.service';

export type EditProgramComponentData<T> = {
  item: T;
  service: BaseService<T>;
};
@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class ProgramFormComponent implements OnInit, OnDestroy{ 
  subscription!: Subscription;
  itemEdited$!: Observable<any>;
  programForm!: FormGroup; 
  isCreate:boolean = true;
  headerTypeLabel: string="Create Program";
  confirmButtonLabel: string="Create";
  constructor(    
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProgramFormComponent>,
    private readonly programService: ProgramService,
    @Inject(MAT_DIALOG_DATA) public data: EditProgramComponentData<any>, 
    public readonly dialogService: DialogService   
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if(this.data){      
      this.headerTypeLabel = "Edit Program";
      this.confirmButtonLabel = "Editar";
      this.isCreate = false;
    }
    else{      
      this.isCreate = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmitEdit() {
    if(this.programForm.controls['name'].errors){
      this.dialogService.showErrorMessage(ErrorMessageComponent,{title:"Error editing program",detail:"The name is required"});
      return;
    }      
    const { item, service } = this.data;    
    item.name = this.programForm.value.name;
    item.description = this.programForm.value.description;    
    this.itemEdited$ = service.edit(item);
    this.subscription = this.itemEdited$.subscribe({
      next: item => {
        this.dialogRef.close(item);
      },
      error: error => {
        this.dialogRef.close();
        this.dialogService.show(ErrorMessageComponent);
      },
    });
  }
  private initializeForm(): void {
    this.programForm = this.formBuilder.group({
      name: [this.data? this.data.item.name:'', [Validators.required, Validators.maxLength(200)]],
      description: [this.data? this.data.item.description:''],
    });
  }

  public getFieldError(field: string): string | null {
    const control = this.programForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }

  public onSubmit(): void {
    if(!this.isCreate){
      this.onSubmitEdit();
    }else{
      if (this.programForm.valid) {
        this.programService.create(this.programForm.value).subscribe({
          next: program => {
            this.dialogRef.close(program);
          },
          error: error => {
            console.error('Error al crear el programa:', error);
          },
        });
      } else this.programForm.markAllAsTouched();
    }    
  }
}
