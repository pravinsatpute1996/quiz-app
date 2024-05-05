import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string | null="";
  public questionList:any = [];
  public currentquestion:number=0;
  public points: number = 0;
  counter = 60;
  correctAns:number=0;
  IncorrectAns:number=0;
  interval$:any;
  progress:string="0"
  constructor(private questservice:QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getallquestion();
    this.startcounter();
  }
  getallquestion(){
    this.questservice.getQuestionjson().subscribe(res=>{
      this.questionList=res.questions
      console.log(this.questionList[this.currentquestion]?.options)
    })
  }
  nextquestion(){
    this.currentquestion=this.currentquestion+1
    console.log(this.currentquestion)
  }
  previousquestion(){


    this.currentquestion=this.currentquestion-1
    console.log(this.currentquestion)
  }
  answer(currentquestion:number ,option:any){
        if(option.correct){
          this.points=this.points+10;
          this.correctAns=this.correctAns+1;
          this.currentquestion=this.currentquestion+1;
          this.getProgresspercent();
        }else{
          this.points=this.points-10;
          this.IncorrectAns=this.IncorrectAns-1;
          this.currentquestion=this.currentquestion+1;
          this.getProgresspercent();
        }
  }
  startcounter(){
    this.interval$= interval(1000).subscribe(val=>{
      this.counter=this.counter-1;
      if(this.counter===0){
        this.currentquestion=this.currentquestion+1;
        this.points=this.points-10;
        this.counter=60;
      }
    })
    setTimeout(()=>{
      this.interval$.unsubscribe()
    },600000)
  }
  stopcounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resettcounter(){
    this.stopcounter();
    this.counter=60;
    this.startcounter();
  }
  resetquiz(){
    this.resettcounter();
    this.getallquestion();
    this.counter=60;
    this.currentquestion=0;
    this.progress="0"
  }
  getProgresspercent(){
    this.progress=((this.currentquestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
