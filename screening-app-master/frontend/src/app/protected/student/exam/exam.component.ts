import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
  private studentIdFromParent: number;

  isLoaded = false;
  examForm: FormGroup;
  time = 7200;
  hours: number;
  minutes: number;
  seconds: number;

  examSubscriber: Subscription;
  timerSubscriber: Subscription;
  answer1Subscriber: Subscription;
  answer2Subscriber: Subscription;
  answer3Subscriber: Subscription;
  getQuesSubsrciber: Subscription;

  qandas = [
    {
      question: '',
      answer: '',
      snapshots: []
    },
    {
      question: '',
      answer: '',
      snapshots: []
    },
    {
      question: '',
      answer: '',
      snapshots: []
    }
  ];

  constructor(private fb: FormBuilder, private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) {
    this.examSubscriber = this.currentRoute.parent.params.subscribe(params => {
      this.studentIdFromParent = params['id'];
      console.log(this.studentIdFromParent);
    });
    this.examForm = this.fb.group({
      'question1': '',
      'question2': '',
      'question3': '',
      'answer1': ['', Validators.required],
      'answer2': ['', Validators.required],
      'answer3': ['', Validators.required]

    });
  }

  ngOnInit() {
    this.getQuesSubsrciber = this.studentService.getExam(this.studentIdFromParent).subscribe((examQuestions: any[]) => {
      if (examQuestions.length > 2) {
        this.isLoaded = true;
        this.startTimer();
        this.examForm.setValue({
          'question1': `Q1) ${examQuestions[0].question}`,
          'answer1': '',
          'question2': `Q2) ${examQuestions[1].question}`,
          'answer2': '',
          'question3': `Q3) ${examQuestions[2].question}`,
          'answer3': ''

        });
        let i = 0;
        examQuestions.forEach(x => {
          this.qandas[i] = {
            question: x.question,
            answer: '',
            snapshots: []
          };
          i++;
        });
        this.subscribeAnswers();
      } else {
        this.route.navigate(['/']);
      }
    });
  }

  subscribeAnswers() {
    this.answer1Subscriber = this.examForm.get('answer1').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      console.log(x);
      this.qandas[0].snapshots.push(x);
    });
    this.answer2Subscriber = this.examForm.get('answer2').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      this.qandas[1].snapshots.push(x);
    });
    this.answer3Subscriber = this.examForm.get('answer3').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x => {
      this.qandas[2].snapshots.push(x);
    });
  }

  startTimer() {
    this.timerSubscriber = timer(0, 1000).subscribe(t => {
      const counter = this.time - t;
      this.minutes = Math.floor(counter / 60);
      this.seconds = counter % 60;
      if (counter < 0) {
        this.isLoaded = false;
        this.timerSubscriber.unsubscribe();
      }
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.qandas[0].answer = form.value.answer1;
    this.qandas[1].answer = form.value.answer2;
    this.qandas[2].answer = form.value.answer3;
    const exam = {
      report: {
        date: new Date(),
        qandas: this.qandas,
        timespent: `${120 - this.minutes} min and ${60 - this.seconds} sec`
      },
      result: false,
      published: false
    };
    this.studentService.submitExam(this.studentIdFromParent, exam).subscribe(() => {
      this.examForm.reset();
      this.isLoaded = false;
      // this.route.navigate(['/']);
    });
  }

  ngOnDestroy() {
    if (this.examSubscriber) { this.examSubscriber.unsubscribe(); }
    if (this.timerSubscriber) { this.timerSubscriber.unsubscribe(); }
    if (this.answer1Subscriber) { this.answer1Subscriber.unsubscribe(); }
    if (this.answer2Subscriber) { this.answer2Subscriber.unsubscribe(); }
    if (this.answer3Subscriber) { this.answer3Subscriber.unsubscribe(); }
    if (this.getQuesSubsrciber) { this.getQuesSubsrciber.unsubscribe(); }
  }

}
