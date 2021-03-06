/* global featureRunner */
/* global expect */
/* global it */
/* global describe */
/* global featureSteps */
/* jshint globalstrict: true */

'use strict';
feature('jasmine-cucumber: Should use regexp to find matchable steps') 
		.scenario('can call when after then')
			.given('enqueue "1"')
			.when('enqueue "2"')
			.then('should be "1,2"')
			.when('enqueue "3"')
			.then('should be "1,2,3"')
		.scenario('can convert json into table args')
			.given('I have two persons', [{lastName: "Doe", firstName:"John"}, {lastName:"Boby", firstName:"Poulpe"}])
			.when('I remove the first one')
			.then('I have just one person', {lastName:"Boby", firstName:"Poulpe"})
		.scenario('this one should be ignored')
			.ignore()
			.given('This step result in an error')
			.then('As it is ignored, it shall not be run (xdescribe)')
        .scenario('can contains doc strings')
            .given('a blog post named "Random" with Markdown body', "Some Title, Eh?\n"+
  "===============\n"+
  "Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,\n"+
  "consectetur adipiscing elit.");

featureSteps("jasmine-cucumber: Should use (.*) to find matchable steps")
	.given('enqueue "(.*)"', function(num){
		this.inputs = this.inputs || []; 
		this.inputs.push(num);
	})
    .given('a blog post named "(.*)" with Markdown body', function(param1, docString){
        expect(param1).toBe("Random")
        expect(docString).toBe("Some Title, Eh?\n"+
  "===============\n"+
  "Here is the first paragraph of my blog post. Lorem ipsum dolor sit amet,\n"+
  "consectetur adipiscing elit.");
    })
	.when('enqueue "(.*)"', function(num){
		this.inputs = this.inputs || []; 
		this.inputs.push(num);
	})
	.then('should be "(.*)"', function(str){ 
		expect(this.inputs.join(',')).toBe(str); 
	});

var nbRuns = 0;
featureSteps('jasmine-cu')
	.given('I have two persons', function(persons){
		this.persons = persons;
		nbRuns++;
	})
	.when('I remove the first one', function(){
		this.persons.splice(0,1);
	})
	.then('I have just one person', function(person){
		expect(this.persons[0]).toEqual(person);
	});
	
featureRunner().run();

describe("feature runner",function(){
	featureRunner().run(); 
	it("should run tests once", function(){
		expect(nbRuns).toBe(1);
	});
});