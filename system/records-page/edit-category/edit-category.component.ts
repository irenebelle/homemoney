import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/category.service';
import { Message } from 'src/app/shared/models/message.model';


@Component({
  selector: 'ir-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  currentCategoryId = 1;
  currentCategory : Category;
  message: Message;

  @Input() categories : Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();


  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();


  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if(capacity < 0) capacity *=-1;

    let category= new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
    .subscribe((category:Category) => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Все супер';
      window.setTimeout(()=>  this.message.text = '', 3000);

    });

  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

}
