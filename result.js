let answersArray = localStorage.getItem('answers')
let questionsArray = localStorage.getItem('questions')

answersArray = JSON.parse(answersArray)
questionsArray = JSON.parse(questionsArray)

if (answersArray == null) {
    alert('No result available. Redirecting to the quiz page')
    location.assign('index.html')
}


const correctAnswersArray = answersArray.filter(function (ans) {
    return ans.correct
})


const numberOfQuestion = questionsArray.length
const score = correctAnswersArray.length
const numberOfQuestionAnswered = answersArray.length



let score_table = ''

answersArray.forEach(function (ans, index) {
    let question = questionsArray.filter(function (quest) {
        return quest.id == ans.id
    })

    if (question.length == 0) {
        return
    }

    question = question[0]

    let sn = index + 1
    let status = ans.correct ? '<span class="badge badge-success">Correct</span>' : '<span class="badge badge-danger">Failed</span>'
    score_table += `
<tr>
    <td>${sn}</td>
    <td>${question.question}</td>
    <td>${ans.option}</td>
    <td>${ans.answer}</td>
    <td>${status}</td>
</tr>`
})


const template = `<div class="container">
                    <div class="row">
                        <div class="col-sm-4">
                            No. of Questions:
                            <span class="font-weight-bold">${numberOfQuestion}</span>
                        </div>
                        <div class="col-sm-4">
                            Score:
                            <span class="font-weight-bold">${score}/${numberOfQuestion}</span>
                        </div>
                        <div class="col-sm-4">
                            Question Answered:
                            <span class="font-weight-bold">${numberOfQuestionAnswered}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 table-responsive">
                            <table class="table table-striped table-bordered bg-light">
                                <tr>
                                    <th>S/N</th>
                                    <th>Question</th>
                                    <th>Your Answer</th>
                                    <th>Answer</th>
                                    <th>Status</th>
                                </tr>
                                ${score_table}
                            </table>
                        </div>
                    </div>
                </div>`

document.querySelector('#score-sheet').innerHTML = template


var slipContainer = document.querySelector('#slip-container')
var btnPrint = document.querySelector('#btn-print')
btnPrint.addEventListener('click', function () {
    let bodyEl = document.body.innerHTML
    document.body.innerHTML = ''
    document.body.innerHTML = slipContainer.innerHTML
    window.print()
    document.body.innerHTML = bodyEl
})