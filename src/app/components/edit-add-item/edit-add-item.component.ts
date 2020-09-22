import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Item} from '../../models/model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-add-item',
  templateUrl: './edit-add-item.component.html',
  styleUrls: ['./edit-add-item.component.scss']
})
export class EditAddItemComponent implements OnInit {
  item: Item;
  formItem: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.item = config.data.item as Item;
    this.initializeForm(this.item);
  }

  ngOnInit(): void {
  }

  private initializeForm(item: Item): void {
    this.formItem = this.formBuilder.group({
      about: new FormControl('', [Validators.required]),
      accessURL: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
    if (item) {
      this.formItem.get('about').setValue(item._about);
      this.formItem.get('accessURL').setValue(item.accessURL);
      this.formItem.get('title').setValue(item.title);
    }
  }

  saveItem(form: NgForm): void {
    if (this.formItem.invalid) {
      this.messageService.add(
        {
          severity: 'error',
          summary: 'Formulario no valido',
          detail: 'El formulario no esta completo o es no valido'
        }
      );
      return;
    }
    this.item = {
      title: form['title'],
      accessURL: form['accessURL'],
      _about: form['about'],
      byteSize: this.item ? this.item.byteSize : null,
      format: this.item ? this.item.format : null,
      type: this.item ? this.item.type : null,
    };
    this.ref.close(this.item);
  }
}
