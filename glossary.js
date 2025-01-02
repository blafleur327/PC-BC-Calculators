/**
 * Class to be created for new terms.
 * @param {string} abbreviation 
 * @param {string} definition 
 */
function Term(abbreviation = undefined,definition = undefined,example = null) {
    this.abbreviation = abbreviation;
    this.definition = definition;
    this.example = example;
    /**
     * Creates the HTML elements.
     * @param {string} name of term.
     * @param {string} parent Document Element ID
     */
    this.build = (name,parent) => {
        let par = document.getElementById(parent);
        let term = document.createElement('div');
        term.setAttribute('class','hoverable');
        console.log(term)
        term.innerHTML = `${name}`;
        let def = document.createElement('div');
        let ex = this.example? true : false;
        def.setAttribute('class','hidden');
        def.innerHTML = `Definition: ${this.definition}`;
        term.append(def);
        if (ex == true) {
            let exam = document.createElement('div');
            exam.setAttribute('class','hidden');
            exam.innerHTML = `Example: ${this.example}`;
            term.append(exam);
        }
        par.appendChild(term);
    }
}

/**
 * Object literal containing definitions and instances of each term.
 */
const Dictionary = {
    'Class': new Term(undefined,'Items in a set that are considered equivalent under some condition.'),
    'Pitch Class': new Term('PC','A Pitch Class is the set of pitches that are octave equivalent and enharmonically equivalent.','PC 0 or C = {C5,C4,B#7,Dbb3}'),
    'Normal Order': new Term('NO','The tightest packing of the input set rearranged into ascending order. Denoted with hard brackets.','{3,9,0} => [9,0,3]'),
    'Prime Form': new Term(undefined,'The tightest packing from the left of the Normal Order or its inversion, transposed to 0. Denoted in parenthesis.','[3,5,6] = (0,1,3)'),
    'Set': new Term(undefined,'A collection of unique elements.','{A,B,C,B,A} = {A,B,C}'),
}

document.addEventListener('DOMContentLoaded',() => {
    for (const [key,value] of Object.entries(Dictionary)) {
        value.build(`${key}`,'defs');
    }
})