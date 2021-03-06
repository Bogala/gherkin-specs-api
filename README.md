# gherkin-specs-api

Test api that use gherkin like syntaxe to describe tests
(can be use with protractor, jasmine, mocha, ... any test framework that use describe / it) 

Any feedback is appreciated ! 


### Example

```javascript
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
			.ignore() // will result in a xdescribe
			.given('This step result in an error')
			.then('As it is ignored, it shall not be run (xdescribe)');

featureSteps("jasmine-cucumber: Should use (.*) to find matchable steps")
	.given('enqueue "(.*)"', function(num){
		this.inputs = this.inputs || []; 
		this.inputs.push(num);
	})
	.when('enqueue "(.*)"', function(num){
		this.inputs = this.inputs || []; 
		this.inputs.push(num);
	})
	.then(/should be "(.*)"/, function(str){ 
		expect(this.inputs.join(',')).toBe(str); 
	});
		
featureSteps(/jasmine-cu/)
	.given(/I have two persons/, function(persons){
		this.persons = persons;
	})
	.when('I remove the first one', function(){
		this.persons.splice(0,1);
	})
	.then('I have just one person', function(person){
		expect(this.persons[0]).toEqual(person);
	});
	
featureRunner().run();	
```