jQuery.srch
===========

Search elements within your page using jQuery.

## Required Files

    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery.srch.js"></script>

## Usage Example

    search=$.srch({
     selector:".search, #header",
     not:".exempt",
     hit:function(elem, results, search) { $(elem).css('background-color', 'green'); },
     nohit:function(elem, results, search) { $(elem).css('background-color', 'red');},
     partialhit:function(elem, results, search) { $(elem).css('background-color', 'yellow');},
     reset:function(elems, search) { $(elem).css('background-color', 'white');}
    });
    results=search.search("Dude what's your problem?");

The variable "search" returns an object in a format as follows:

    {
     options:{
      selector:".search, #header",
      not:".exempt",
      hit:function(elem, results, search) { $(elem).css('background-color', 'green'); },
      nohit:function(elem, results, search) { $(elem).css('background-color', 'red');},
      partialhit:function(elem, results, search) { $(elem).css('background-color', 'yellow');},
      reset:function(elems, search) { $(elem).css('background-color', 'white');}
     },
     search:function(search) {
      ...
     }
    }
    
The variable "results" performs the corresponding actions (hit, nohit, partialhit, reset) and returns false if it was sent an invalid search term (lots of spaces). Returns a format such as the following if not false:

    { 
     hits:[elem1, elem2, elem3],
     partials:[elem4],
     nohits:[]
    }

## Options
* **selector** (required) - Elements to search. - String
* **not** (optional) - Elements not to search if they might be included in the selector. - String
* **hit** (optional) - Function to run for each element that has a 100% hit. - Function - function(element, results for element, search phrase)
* **nohit** (optional) - Function to run for each element that produces no hits. Will run in place of partialhit if it is undefined. - Function - function(element, results for element, search phrase)
* **partialhit** (optional) - Function to run for each element that has partial matches (matches at least one word but doesn't match all). Will be replaced by nohit if undefined. - Function - function(element, results for element, search phrase)
* **reset** (optional) - Function to run if the search term is null. Optional but preferred if hit, nohit, or partialhit is defined. - Function - function(matched elements, search phrase)

## License: Public Domain
Please don't rename it or change credit away from me, James Anthony Bruno, because that would make me sad. It is fine, however, to make changes to srch's core to suit your needs for use in your products (whether commercial, personal, or non-profit). If you believe you've found a better way for srch to work, go ahead and message me and let me know! I would love to implement your fix. 
