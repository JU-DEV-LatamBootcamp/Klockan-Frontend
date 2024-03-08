import { TestBed } from '@angular/core/testing';

import { ClassroomService } from './classroom.service';

describe('ClassroomService', () => {
  let service: ClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('getById() should be returning data', () => {
    expect(service).toBeTruthy();
    service.getById(1, true).subscribe({
      next: classroom => {
        expect(classroom).not.toBeNull();
      },
    });
  }); */
});
