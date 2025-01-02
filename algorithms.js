/**
 * Create Delay.
 * @param {float} delMS 
 * @returns 
 */
const delay = (delMS = 1000) => {
    return new Promise(resolve => setTimeout(resolve,delMS));
}

/**
 * Series of methods useful for manipulating and dealing with arrays.
 */
const ArrayMethods = {
    /**
     * Pushes element into array provided it is not already present. (Prevents duplication);
     * @param {any} element 
     * @param {array} array 
     */
    conditionalPush: function (element,array) {
        array.indexOf(element) == -1? array.push(element) : array;
        return array;
    },
    /**
     * Returns array indexes that are included in indexes array.
     * @param {array} array Input to be filtered.
     * @param {array} indexes Indexes to keep.
     * @returns Filtered Array.
     */
    indexer: function (array,indexes) {
        let res = [];
        for (let a = 0; a < indexes.length; a++) {
            res.push(array[a]);
        }
        return res;
    },
    /**
     * Returns an indexed rotation of an input array. Optionally concatenate.
     * @param {array} array 
     * @param {int} index 
     * @param {boolean} concat 
     * @returns array || string
     */
    singleRotate: function (array,index,concat = false) {
        let res = [...array.slice(index),...array.slice(0,index)];
        return concat? res.join('|') : res;
    },
    unpack: (array) => {
        let res = [];
        for (let a = 0; a < array.length; a++) {
            res.push(...array[a]);
        }
        return res;
    },
/**
 * Returns all rotations of a given array. Optionally concatenate subarrays.
 * @param {array} array 
 * @param {boolean} concat 
 * @returns 2d array || 1d array ['str'];
 */
    rotations: function (array,concat = false) {
    let res = [];
    for (let a = 0; a < array.length; a++) {
        res.push(ArrayMethods.singleRotate(array,a,concat));
    }
    return res;
},

/**
 * Checks the two arrays to determine if one is an ordered rotation of the other. Can return the rotation index or a boolean.
 * @param {array} array1 
 * @param {array} array2 
 * @param {boolean} showIndex 
 * @returns int || boolean
 */
    isRotation: function (array1,array2,showIndex = false) {
        let opts = ArrayMethods.rotations(array2,true);
        let result = opts.indexOf(ArrayMethods.singleRotate(array1,0,true));
        return showIndex? result : result !== -1;
    },
    /**
     * Iterative algorithm for finding all indexes of a given element.
     * @param {array} array 
     * @param {any} element 
     * @returns Indexes
     */
    array_find: function (array,element) {  //O(n)
        let res = [];
        for (let a = 0; a < array.length; a++) {
            if (array[a] == element) {
                res.push(a);
            }
        }
        return res;
    },
    /**
     * Returns the all indexes of elements in the input array.
     * @param {array} array 
     * @param  {...any} elements 
     * @returns Array
     */
    get_many: function (array,...elements) {
        let res = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = 0; b < elements.length; b++) {
                if (array[a] == elements[b]) {
                    res.push(a);
                }
            }
        }
        return res;
    },
    /**
     * Concatenates an array, if array is 2d, concatenates each subarray.
     * @param {array} array 
     * @returns 1d array
     */
    array_concat: function (array) {
        if (typeof array[0] === 'object') {
            return array.map(x => x.join('|')); //Use the pipe to prevent confusion with decimal points.
        }
        else {
            return array.join('|');
        }
    },
    /**
     * Creates an array of size (elements) with pseudo-random numbers between min-max (inclusive).
     * @param {int} elements 
     * @param {int} min 
     * @param {int} max 
     * @returns array
     */
    random_array: function (elements,min,max) {
        let res = [];
        for (let a = 0; a < elements; a++) {
        res.push(Math.floor(Math.random()*(max-min+1))+min);
        }
        return res;
    },
    /**
     * Reverses an input array.
     * @param {array} array 
     * @returns reversed array
     */
    reverse: function (array) {
        return array.reverse();
    },
    /**
     * Search a 2d array for a subarray. Returns indexes.
     * @param {array} query 
     * @param {array} array 
     * @returns Indexes
     */
    search_subarrays: function (query,array) {
        let conc = ArrayMethods.array_concat(array);
        return ArrayMethods.array_find(conc,ArrayMethods.array_concat(query));
    },

    /**
     * Returns either the unique subarrays or the number of instances of each unique subarray. 
     * @param {array} array 
     * @param {boolean} ordered true: [a,b] != [b,a] false: [a,b] == [b,a]; 
     * @param {boolean} return_count Output shows unique elements and their count.
     * @param {boolean} return_indexes Outputs the indexes of unique transformations.
     * @returns Unique Subs || Counts.
     */
    unique_subarray: function (array,ordered = false,return_count = false,return_indexes = false) { //O(n * log(m))
        let step1 = ordered? array.map(sub => sub.join('|')) : array.map(sub => sub.sort((a,b) => a-b).join('|'));
        let elim = Array.from(new Set(step1));
        let inds = elim.map(x => step1.indexOf(x));
        if (return_indexes == true) {
            return inds;
        }
        else {
            if (return_count == false) {
                return inds.map(index => array[index]);
            }
            else {
                return inds.map(index => [array[index],this.get_many(step1,step1[index]).length]);
            }
        }
    },
    /**
     * Gets the same indexes from unique entries of array 1 in array 2.
     * @param {array} array1 
     * @param {array} array2 
     */
    symmetrical_removal: function (array1,array2) {
        let start = ArrayMethods.unique_subarray(array1,undefined,undefined,true);
        return ArrayMethods.indexer(array2,start);
    }
}

/**
 * Class filled with methods for combinatorics calculation.
 */
const Combinatorics = {
    /**
     * Recursively calculate n!
     * @param {int} n 
     * @param {int} res 
     * @returns n!
     */
    factorial: function (n,res = 1) {
        if (n == 1) {
            return res;
        }
        else {
            return this.factorial(n-1,res*n);
        }
    },
    /**
     * 
     * @param {int} universe m
     * @param {int} cardinality n
     */
    binomial_coefficient: function (universe,cardinality) {     //n = cardinality | m = universe
        return this.factorial(universe)/(this.factorial(cardinality)*this.factorial(universe-cardinality));
    },

    /**
     * Gets the Elements of size n within a given universe.
     * @param {int} universe 
     * @param {int} card 
     * @returns Powerset in Binary Representation.
     */
    binary_representation: function (universe,card) {
        let res = [];
        let count = 0;
        let max = parseInt(''.padStart(card,'1').padEnd(universe,'0'),2);   //Get value that starts with k 1s.
        for (let a = 2**card-1; a <= max; a++) {   
            let option = a.toString(2).padStart(universe,'0');
            let check = Array.from(option.match(/1/g)).length; //Does this modify the og string?
            if (check === card) {
                res.push(option);
            }
            count++;
        }
        return res;
    },

    /**
     * Returns elements from array that are 1 (True) in binary representation.
     * @param {array} array 
     * @param {string} bin 
     * @returns Array
     */
    picker: function (array, bin) {
        return array.filter((item, index) => bin[index] === '1');
    },

    /**
     * Returns all subsets of a given cardinality.
     * @param {array} superset 
     * @param {int} cardinality 
     * @returns Array
     */
    subsets: function (superset,cardinality) {
        let first = this.binary_representation(superset.length,cardinality);
        return first.map(z => this.picker(superset,z));
    }
}

/**
 * Constructor of the MySet class. Contains methods for set theoretical computation.
 * @param {int} modulus 
 * @param  {...any} elements 
 */
function MySet(modulus,...elements) {
    this.modulo = (value,modulus) => { //(2 operations per call);
        if (value >= 0) {
            return value%modulus;
        }
        else {
            return (value%modulus)+modulus;
        }
    }
    this.universe = modulus,
    this.set = Array.from(new Set(elements.map(x => this.modulo(x,this.universe)))).sort((a,b) => a-b), //3 operations
    this.interval_class = (value,modulus = this.universe) => {
        let opts = [this.modulo(value,modulus),this.modulo(modulus-value,modulus)];
            return Math.min(...opts);
        },
    /**
    * Returns the Adjacency Interval Series, or the intervals between consecutive elements in a given modular universe.
    * @param {array} array 
    * @param {int} modulus 
    * @returns array. 
    */
    this.ais = (array = this.set,modulus = this.universe) => {  //O(n) (Linear)
        let res = [];
        for (let a = 1; a < array.length; a++) {
            res.push(this.modulo(array[a]-array[a-1],modulus));
            }
        return res;
        },
    /**
     * 
     * @param {int} index 
     * @returns this.set -> t(n) mod this.universe.
     */
    this.transpose = function (array = this.set, modulus = this.universe, index = 0) {
        return array.map(x => this.modulo(x+index,modulus)); //O(n);
    },
    /**
     * 
     * @param {int} index 
     * @returns this.set -> t(n)I mod this.universe. 
     */
    this.invert = function (array = this.set,modulus = this.universe,index = 0) {
        return array.map(x => this.modulo(index-x,modulus)); //O(n);
        },
    /**
    * Generates the powerset of an input using bitwise operands. Faster than array manipulation method. Useful for large sets. 
    * @param {array} array 
    * @returns powerset
    */
    this.literal_subsets = (cardinality = null,array = this.set) => {   // O(2^n) //4+(2^n) operations. 
        let result = [];
        if (cardinality === null) {
            for (let a = 1; a <= array.length; a++) {
                result.push(...Combinatorics.subsets(array,a));
            }
        }
        else {
            result = Combinatorics.subsets(array,cardinality);
        }
        return result;
    },
    /**
     * There's a recursion depth issue here.
     * @param {array} array 
     * @param {int} mod 
     * @returns Literal Subsets in Prime Form.
     */
    this.abstract_subsets = (cardinality = null,uniques = false,array = this.set, mod = this.universe) => {    //2 additional operations.
        let start = this.literal_subsets(cardinality,array).filter(x => x.length > 2);
        let res = start.map(y => this.prime_form(y,mod)).sort((a,b) => a.length < b.length);
        return uniques? ArrayMethods.unique_subarray(res) : res;
    },
    /**
     * Normal order function using the Straus-Rahn Algorithm. Iterative implementation.
     * @param {array} array this.set
     * @param {int} mod this.universe
     * @param {bool} showSteps
     * @returns Normal Order
     */
    this.normal_order = (array = this.set,mod = this.universe,showSteps = false) => { // Total = O(n^2)
        console.log(showSteps? `SHOW STEPS` : 'ANSWER ONLY');
        let displayOrder = [];
        let index = array.length-1; 
        let step1 = array.sort((a,b) => a-b);
        displayOrder.push(`Sort elements into ascending order: [${step1}]`);
        let rotations = [...ArrayMethods.rotations(step1)]; //n ops Step2
        displayOrder.push(`Get all rotations of the now sorted set: ${rotations.map(z => `[${z}]`)}`);
        while (index > 0) {     //n
            let curr = [];
            for (let a = 0; a < rotations.length; a++) {    //n
                let bound = this.modulo(rotations[a][index]-rotations[a][0],mod);
                //check for full symmetry....
                curr.push(bound); //1
            }
            displayOrder.push(`Round ${array.length-index}`);
            let small = ArrayMethods.array_find(curr,Math.min(...curr)); //2 opers  Break upon finding single winner. Or If symmetrical return index 0.
            displayOrder.push(`The smallest interval betweeen elements 0-${index} elements is <${Math.min(...curr)}>, found in rotation${small.length > 1? 's' : ''}...{${small.length > 1? small.map(x => `[${rotations[x]}]`) : rotations[small]}}.`);
            if (small.length == 1 || index == 0) {
                displayOrder.push(`Normal Form of {${array}} in modulo ${mod} is [${rotations[small[0]]}]`);
                return showSteps? displayOrder : rotations[small[0]];
            }
            else {      //Remove rotations not in small;
                rotations = small.map(x => rotations[x]); //n
            }
            index--;//1
        }
        displayOrder.push(`Set is symmetrical. Normal Form is the rotation with smallest starting PC...[${rotations[0]}]`);
        return showSteps? displayOrder : rotations[0];    //if rotations.length > 1 all are acceptabe Normal Orders.
    }
    /**
    * Returns the Prime Form of a set (Straus-Rahn)
    * @param {array} array 
    * @param {int} mod 
    * @returns Prime Form
    */
    this.prime_form = (array = this.set,mod = this.universe) => { // O(n);
        let norm = this.normal_order(array,mod);
        let options = [norm,this.normal_order(this.invert(norm))];  //1
        let intervals = options.map(x => this.ais(x,mod)); //n
        let round = 0;
        while (round < intervals[0].length) { //n-1;
            if (intervals[0][round] < intervals[1][round]) {
                return options[0].map(x => this.modulo(x-options[0][0],mod));
            }
            else if (intervals[0][round] > intervals[1][round]) {
                return options[1].map(x => this.modulo(x-options[1][0],mod));
            }
            else if (round == array.length-2) {
                return options[0].map(x => this.modulo(x-options[0][0],mod));
            }
            else {
                round++;
            }
        }
    },
    /**
     * Generates the ICV of an input set. The sum of all intervals between constituent members. Essentially a summary of invariant tones under transposition. Holds true for all members of set class.
     * @param {array} array 
     * @param {int} mod 
     * @returns Interval Class Vector 
     */
    this.interval_class_vector = (array = this.set,mod = this.universe) => {    //n^2)/2
        let collect = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = a+1; b < array.length; b++) {
                collect.push(this.modulo(array[b]-array[a],mod));//2
            }
        }
        let vector = [];
        for (let a = 1; a <= Math.floor(mod/2); a++) {
            if (a == Math.ceil(mod/2)) {
                vector.push(ArrayMethods.array_find(collect,a).length);
            }
            else {
                vector.push(ArrayMethods.array_find(collect,a).length+ArrayMethods.array_find(collect,mod-a).length)
            }
        }
        return vector;
    },
    /**
     * Returns the IV of an input set. This is a summary of the number of invariant tones under inversion. As such it is unique to each T or I in a set class.
     * @param {array} array 
     * @param {int} mod 
     * @returns Index Vector
     */
    this.index_vector = (array = this.set,mod = this.universe) => { // n^2+n+2
        let collect = [];
        for (let a = 0; a < array.length; a++) {
            for (let b = 0; b < array.length; b++) {
                collect.push(this.modulo(array[b]+array[a],mod));
            }
        }
        let vector = [];
        for (let a = 0; a < mod; a++) {
            vector.push(ArrayMethods.array_find(collect,a).length);
        }
        return vector;
    }
    /**
     * Returns all transpositions and inversions of a given set as an object literal.
     * @param {array} array 
     * @param {int} modulus 
     * @returns Set Class
     */
    this.set_class = (array = this.set,modulus = this.universe,eliminateDuplicates = false) => {
        let result = {};
        for (let a = 0; a < modulus; a++) {
            result['T'+a] = this.normal_order(array.map(x => this.modulo(x+a,modulus)),modulus);
            result['I'+a] = this.normal_order(array.map(y => this.modulo(a-y,modulus)),modulus);
        }
        if (eliminateDuplicates == true) {
            result = ArrayMethods.unique_subarray(result);
        }
        return result;
    },
    /**
     * Determines if two input arrays have any meaningful PC relationship. It the sets are the same cardinality, test
     *  for T/I and Z relation. If the two sets are not the same cardinality, tests for literal and abstract (Prime Form) inclusionary relationship.
     * @param {array} array1 
     * @param {array} array2 
     * @param {int} modulus 
     * @returns Relationship
     */
    this.compare_set = (array1, array2 = this.set,modulus = this.universe) => {
        let no1 = this.normal_order(array1,modulus); 
        let no2 = this.normal_order(); 
        if (array1.length == array2.length) {   //Transposition or Inversional Equivalence.
            let sc = this.set_class(no2,modulus);
            let res = null;
            for (value in sc) { 
                if (ArrayMethods.array_concat(sc[value]) == ArrayMethods.array_concat(no1)) {
                    res = value;
                }
            }
            if (res === null) { //Z relation
                if (ArrayMethods.array_concat(this.interval_class_vector(array2,modulus)) == ArrayMethods.array_concat(this.interval_class_vector(array1,modulus)) == true) {
                    res = `[${array1}] and [${array2}] are Z related.`;
                }
                else {
                    res = 'No Relationship.';
                }
            }
            return res;
        }
        else {      //Not same cardinality. Maybe Move this up?
            let sizes = [no1,no2].sort((a,b) => a.length - b.length); //sizes[0] = short sizes[1] = long;
            let subs = {
                'Literal': this.literal_subsets(null,sizes[1]).map(x => this.normal_order(x,modulus)),
                'Abstract': this.abstract_subsets(sizes[1],modulus)
                };
            let checkLits = ArrayMethods.search_subarrays(sizes[0],subs['Literal']).length;
            let checkAbs = ArrayMethods.search_subarrays(this.prime_form(sizes[0]),subs['Abstract']).length;
            if (checkLits > 0) {
                return `[${sizes[0]}] is a literal subset of [${sizes[1]}].`;
            }
            else if (checkLits == 0 && checkAbs > 0) {
                return `[${sizes[0]}] is an abstract subset of [${sizes[1]}]. Contained ${checkAbs} times.`;
            }
            else {
                return 'No inclusionary relationship.'
            }
        }
    },
    this.displayProperties = (...info) => {
        let result = {};
        let options = {
            'Normal Form': this.normal_order(),
            'Prime Form': this.prime_form(),
            'Interval Class Vector': this.interval_class_vector(),
            'Index Vector': this.index_vector(),
            'Literal Subsets': this.literal_subsets(),
            'Abstract Subsets': this.abstract_subsets()
        }
        info.forEach(item => {
            let regex = new RegExp(item,'ig');
            for (key in options) {
                if (key.match(regex)) {
                    result[key] = options[key];
                }
            }
        })
        return result;
    },
    /**
     * Find axes of symmetry within a set.
     * @param {array} array 
     * @param {int} modulus 
     * @returns Axes of Symmetry
     */
    this.symmetry = (array = this.set,modulus = this.universe) => {
        let res = [];
        let test = array.sort((r,s) => r-s).reduce((f,k) => f+'|'+k);
        for (let a = 0; a < modulus; a++) {
            let opt = this.invert(array,modulus,a).sort((i,j) => i-j).reduce((l,m) => l+'|'+m);
            opt == test? res.push([a/2,(a/2)+(modulus/2)]): null;
        }
        return res;
    },
    /**
     * Checks the superset for all contained instances of the subset.
     * @param {array} subset
     * @param {array} superset
     * @param {int} modulus 
     */
    this.contains_subset = (subset, superset = this.set,modulus = this.universe) => {
        let subAsSet = this.set_class(subset,modulus);
        let sup = superset;
        let final = {};
        for (const [key,value] of Object.entries(subAsSet)) {
            let trues = 0;
            for (let a = 0; a < value.length; a++) {
                if (sup.indexOf(value[a]) == -1) {
                    break;
                }
                else {
                    trues++;
                }
            }
            trues == value.length? final[key] = value : null;
        }
        return final;
    },
    /**
     * 
     * @param {array} array 
     * @param {int} universe 
     * @returns Array
     */
    this.boundary = (array = this.set,universe = this.universe) => {
        let res = [];
        for (let a = 1; a < array.length; a++) {
            res.push(this.modulo(array[a]-array[0],universe));
        }
        return res;
    }
};

/**
 * @param {int} mod = 12
 * @param {array} array 
 */
function DrawSetCells (mod = 12,array) {
    this.size = array.length*30;
    let canvas = document.createElement('div');
    canvas.setAttribute('id',`drawing${drawings.length? drawings.length : 0}`);
    document.getElementById('drawings').append(canvas);
    this.draw = SVG().addTo(`#drawing${drawings.length? drawings.length : 0}`).size(this.size,this.size);
    this.center = [this.size/2,this.size/2];
    this.intervals = [];
    let displace = this.size/5;
    let size = 20;
    this.passedOrder = array;
    this.elementCoordinates = {};
    let modus = (elem,modulus = mod) => {
        return elem > 0? elem%modulus : (elem%modulus)+modulus;
    }
    /**
     * Draws the set.
     */
    this.step1 = () => {
        for (let a = 0; a < array.length; a++) {
            this.elementCoordinates[`${a}`] = [displace+(a*size),displace*4];
            let grp = this.draw.group().translate(displace+(a*size),displace*4).id(`Elem${a}`);
            let rect = this.draw.rect(size,size).fill('white').center(0,0);
            let text = this.draw.text(`${array[a]}`).center(0,0);
            grp.add(rect);
            grp.add(text);
        }
    }
    /**
     * 
     * @param {int} iteration 
     */
    this.step2 = (iteration = 0) => {
        let brackHeight = 12;
        let index = (array.length-1)-iteration;
        let vert = (array.length*brackHeight)-(iteration*brackHeight);
        let brack = this.draw.polyline().stroke({color: 'black', width: '1px'}).fill('none');
        let el2 = this.elementCoordinates[`${index}`];
        let brackCoords = [this.elementCoordinates[0],                  // Start point
        [this.elementCoordinates[0][0], this.elementCoordinates[0][1] - vert], // Downward line
        [el2[0], this.elementCoordinates[0][1] - vert], // Horizontal segment
        el2];  
        brack.plot(brackCoords);
        let theInt = modus(this.passedOrder[index]-this.passedOrder[0]);
        this.intervals.push(theInt);
        this.draw.text(`${theInt}`).center(brackCoords[2][0]+8,brackCoords[2][1]-5);//1 less since intervals.
    }
    this.removeSelf = () => {
        document.querySelector(`#drawing${drawings.length? drawings.length : 0}`).remove();
    }
    drawings.push(this);
}

let D;
let data = {
    'universe': null,
    'set': null,
    'setObject': null,
}

let drawings = [];

document.addEventListener('DOMContentLoaded',() => {
    console.log('READY!');
    let ins = document.querySelectorAll('input');
    let ct = 0;
    ins.forEach(item => {
        let regex = /[0-9]+/g;
        item.addEventListener('keydown',(event) => {
            document.getElementById('display').innerHTML = '';
            if (event.key === 'Enter') {
                ct = 0;
                if (item.id == 'universe') {
                    data.universe = parseInt(item.value.match(regex));
                }
                else if (item.id == 'set') {
                    data.set = item.value.match(regex).map(x => parseInt(x));
                }
            }
            if (data.universe !== null && data.set !== null) {
                data.setObject = new MySet(data.universe,...data.set);
                document.getElementById('display').append(`Input : {${data.set}}`);
                let d = ArrayMethods.rotations(data.setObject.set);
                d.forEach(rot => {
                    new DrawSetCells(data.universe,rot);
                })
            }
        });
    })
    document.addEventListener('keypress',(event) => {
        if (event.key === ' ') {
            drawings.forEach(item => {
                item.step1();
            })
            if (ct < list.length) {
                let text = document.createElement('div');
                text.textContent = `(${ct}): ${list[ct]}`;
                document.getElementById('display').append(text);
                ct++;
            }
        }
    })
})

