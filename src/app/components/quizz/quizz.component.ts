import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:any = ""
  answerSelected_two:any = ""
  selectedKey: string = "";


  carreira: any;
  carreira_description: any;
  linguagem:any;
  linguagem_description:any;







  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false
  selectedAnswers: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }


  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
    this.selectedAnswers = this.filterAnswers(this.answers);
  }

  filterAnswers(answers: string[]): string[] {
    return answers.filter(answer => ["E", "F"].includes(answer));
  }


  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.selectedKey = finalAnswer;
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
      console.log(this.answers);
      console.log(this.selectedAnswers);
      this.answerSelected_two = quizz_questions.results[this.selectedAnswers[0] as keyof typeof quizz_questions.results]
      this.linguagem = this.answerSelected_two[this.selectedKey]

      this.carreira = this.answerSelected[0]
      this.carreira_description = this.answerSelected[1]
      this.linguagem_description = this.linguagem[2]
      console.log(this.selectedKey);
      console.log(this.answerSelected_two[this.selectedKey]);



    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
