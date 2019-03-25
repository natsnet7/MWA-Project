import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  questionForm: FormGroup;
  questionList: any[];
  isLoaded = false;
  control: any;
  questionSubscrption: Subscription;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
    this.questionForm = formBuilder.group({
      'category': ['', Validators.required],
      'question': ['', Validators.required]
    });
    this.control = this.questionForm.controls;
  }

  ngOnInit() {
    this.getRecentQuestionData();
  }

  ngOnDestroy() {
    if (this.questionSubscrption) {
      this.questionSubscrption.unsubscribe();
    }
  }

  onSubmit() {
    const questionObj = {
      category: this.control.category.value,
      question: this.control.question.value,
      active: true,
    };
    this.questionForm.reset();
    this.questionService.addQuestion(JSON.stringify(questionObj)).subscribe((response: any) => {
      this.getRecentQuestionData();
    });
  }

  setActive(question, status) {
    // console.log(status);
    this.questionService.updateQuestion({question: question, status: status}).subscribe(data => {
      this.getRecentQuestionData();
    });
  }

  getRecentQuestionData() {
    this.questionSubscrption = this.questionService.getQuestions().subscribe((questions: any[]) => {
        this.isLoaded = true;
        this.questionList = questions;
    });
  }
}
