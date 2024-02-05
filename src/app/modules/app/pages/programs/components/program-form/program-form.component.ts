import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/shared/services/base.service';
import { Subscription, Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { Program } from 'src/app/shared/models/Programs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type EditProgramComponentData<T> = {
  item: T;
  service: BaseService<T>;
};
@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.sass']
})
export class ProgramFormComponent<T> implements OnInit, OnDestroy{ 
  subscription!: Subscription;
  itemEdited$!: Observable<any>;
  programForm!: FormGroup; 
  constructor(    
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProgramFormComponent<any>>,
    @Inject(MAT_DIALOG_DATA) public data: EditProgramComponentData<any>, 
    public readonly dialogService: DialogService   
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializeForm(): void {
    this.programForm = this.formBuilder.group({
      name: [this.data.item.name, Validators.required],      
      description: [this.data.item.description],
    });
  }

  onSubmit() {
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
}
