import { TestBed } from '@angular/core/testing';

import { UploadProfilePicService } from './upload-profile-pic.service';

describe('UploadProfilePicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadProfilePicService = TestBed.get(UploadProfilePicService);
    expect(service).toBeTruthy();
  });
});
