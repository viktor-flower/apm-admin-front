import {fakeAsync, flush, inject, TestBed} from '@angular/core/testing';
import {UiService} from './ui';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';

describe('Ui service', () => {
  let service: UiService;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        UiService
      ]
    }).compileComponents();
    service = TestBed.get(UiService);
  });

  beforeEach(inject([MatSnackBar, OverlayContainer], (sb: MatSnackBar, oc: OverlayContainer) => {
    snackBar = sb;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));


  it('Show message', fakeAsync(() => {
    service.showMessage('Test message.', 'info');
    const messageElement = overlayContainerElement.querySelector('snack-bar-container')!;
    expect(messageElement.textContent).toContain('Test message.',
      'Expected snack bar to show a message without a ViewContainerRef');
    flush();
  }));

});
