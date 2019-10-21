import { ApplicationCoreModule } from './application-core.module';

describe('ApplicationCoreModule', () => {
  let applicationCoreModule: ApplicationCoreModule;

  beforeEach(() => {
    applicationCoreModule = new ApplicationCoreModule();
  });

  it('should create an instance', () => {
    expect(applicationCoreModule).toBeTruthy();
  });
});
