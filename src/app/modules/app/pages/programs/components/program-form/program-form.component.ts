import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ProgramService } from 'src/app/shared/services/program.service';

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
export class ProgramFormComponent implements OnInit {
  programForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProgramFormComponent>,
    private readonly programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.programForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
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
