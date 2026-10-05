import { Locator, Page, expect } from "@playwright/test";
import { TextbookPage } from "../textbookPage";
import { error } from "console";

//setup page to be used in the test
//Setup either string locaors or Locator objects
//Use dragTo() method to drag and drop elements
//Use expect() to assert that the elements have been moved
//Export the page class
//prettier-ignore
export class OverviewDragNdrop extends TextbookPage {
//Header Locator Objects
    readonly header: Locator = this.page.getByRole('heading', { name: 'Drag N Drop' })
  //Chioces Locator Objects
  readonly dragNdropBox1: Locator = this.page.locator('.rsdraggable').first();
  readonly dragNdropBox2: Locator = this.page.locator('.rsdraggable').nth(1);
  readonly monroeDoctrine: Locator = this.page.locator('text="Monroe Doctrine"');
  readonly haymarket: Locator = this.page.getByText("Haymarket Riot", {exact: true,});
  readonly louisianaPurchase: Locator = this.page.locator('text="Louisiana Purchase"');
  readonly gettysburg: Locator = this.page.getByText('Battle of Gettysburg', { exact: true });
  //Answers Locator Objects
  readonly monroeDoctrineAnswer: Locator = this.page.getByText("1823", {exact: true,});
  readonly haymarketAnswer: Locator = this.page.getByText("1886", {exact: true,});
  readonly louisianaPurchaseAnswer: Locator = this.page.getByText("1803", {exact: true,});
  readonly gettysburgAnswer: Locator = this.page.getByText("1863", {exact: true,});
  //Buttons Locator Objects
  readonly checkMeButton: Locator = this.page.getByRole("button", {name: "Check me", });
  readonly reset: Locator = this.page.getByRole("button", { name: "Check me" });
  //Answer Box Locator Objects
  readonly resultsCorrect: Locator = this.page.getByText("You are correct!");
  readonly resultsInCorrect: Locator = this.page.locator('#dnd1_feedback');
  //Found that it highlights incorrect answers in red
  //It get the number of correct answers
  //It get the number of incorrect answers
  //This is tricky because it is not a direct text match

  //constructor
  constructor(page: Page) {
    super(page);
  }
  //Goto Drag and Drop Page
    async goToDragNdropPage() {
        await this.page.goto("/ns/books/published/overview/Assessments/dragndrop.html");
        await this.header.waitFor({ timeout: 7000 });
    }
  //Call to Actions
  async clickReset(){
    await this.reset.click();
  }
  async clickCheckMe(){
    await this.checkMeButton.click();
  }

//Drag and drop elements to the correct answer box
  async dragToCorrectAnswer() {
    //Drag and drop elements to the correct answer box
    await this.monroeDoctrine.dragTo(this.monroeDoctrineAnswer);
    await this.haymarket.dragTo(this.haymarketAnswer);
    await this.louisianaPurchase.dragTo(this.louisianaPurchaseAnswer);
    await this.gettysburg.dragTo(this.gettysburgAnswer);
    await this.checkMeButton.click();
  }
  //Drag and Drop to the incorrect answer box
  async dragTo4InCorrectAnswer(){
    await this.monroeDoctrine.dragTo(this.gettysburgAnswer);
    await this.haymarket.dragTo(this.louisianaPurchaseAnswer);
    await this.louisianaPurchase.dragTo(this.monroeDoctrineAnswer);
    await this.gettysburg.dragTo(this.haymarketAnswer);
    await this.checkMeButton.click();

  }
  async dragTo3InCorrectAnswer(){
    await this.monroeDoctrine.dragTo(this.monroeDoctrineAnswer);
    await this.haymarket.dragTo(this.louisianaPurchaseAnswer);
    await this.louisianaPurchase.dragTo(this.gettysburgAnswer);
    await this.gettysburg.dragTo(this.haymarketAnswer);
    await this.checkMeButton.click();

  }
  async dragTo2InCorrectAnswer(){
    await this.monroeDoctrine.dragTo(this.monroeDoctrineAnswer);
    await this.haymarket.dragTo(this.louisianaPurchaseAnswer);
    await this.louisianaPurchase.dragTo(this.haymarketAnswer);
    await this.gettysburg.dragTo(this.gettysburgAnswer);
    await this.checkMeButton.click();

  }
  async dragTo1InCorrectAnswer(){
    await this.monroeDoctrine.dragTo(this.monroeDoctrineAnswer);
    await this.haymarket.dragTo(this.haymarketAnswer);
    await this.louisianaPurchase.dragTo(this.louisianaPurchaseAnswer);
    await this.checkMeButton.click();

  }
  //Validate the results
  async validateResults(correct: number, incorrect: number){
  
    //Get the text content of the results message
  const resultText = await this.resultsInCorrect.textContent();
  
  // Extract correct and incorrect values using regEx
  const match = resultText?.match(/(\d+) correct and (\d+) incorrect/);

  if(!match){
    throw new Error("Failed to extract");
  }
  // Convert extracted values of integers
  const actualCorrect = parseInt(match[1], 10);
  const actualIncorrect = parseInt(match[2],10);
 
  
 console.log(`Found: ${actualCorrect} correct, ${actualIncorrect} incorrect`);
    // Return values for further assertions in test spec
    return { correct: actualCorrect, incorrect: actualIncorrect };
  }
}
