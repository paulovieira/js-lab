
    - DONE name in the state: is it really necessary? the description should be enough, and we should be always rendering all the states (if one of them fails, skip)
    - DONE check that the selector given in the insertIn exists: should be done in the renderState function
    - DONE check thar the template has been loaded: also in the renderState function (if a template is missing for one state, it should not prevent the other states from rendering)
    - DONE if one state fails rendering, the output htmlwith the list of states should still list that state, with a red flag
    - the list of states is itself a state (the library is using itself to create part of the funcionality!
        )
    - DONE what happens if there are repeated ids among the templates used for 1 state? (not within a single template) -  we should restrit the query only to the template s cheerio - that's what we are doing
    - watch for changes in the loaded templates and states and re- render the state (chokidar module)
    - create a nice html page listing the rendered states, with links to the actually state
    - DONE allow the user to provide a custom document
    - provide some documents that include bootstrap and jquery
    - DONE allow to re- use states in the tree (instead of inserting a template, we insert a state, which itself has a tree of templates)
    - DONE find a json parser that is more forgiving to extra commas
    - DONE if the context is an array (of objects), render the template for each object (collection view mode)
    - add a "random mode" (either random text or lorem ipsum); this will append random words the the properties of the context (so the values in the context can all be empty string); the number of words can be defined (min, max)
    - when giving the paths for the templates and states, the extension can be ommited
    - DONE getStates should accept a glob pattern as well We could then do this

            var stateObj = states
                .renderStates("states/*.json")
                .getStates("states/*.json");

    -when loading a new template we should remove the object of any previously loaded template with the same path (which might have been registered with a different rendering engine); the same for documents, engines and states
    -rename:
         "insertIn" -> "container"
         "container" (current) -> "subContainer"
    -the configuration of the state should have an option that would remove the element given in "container" (former "insertIn"). Example: "removeContainer: true". This would be useful to document server-side templates (use "replaceWith")

module to get random words or phrases


.getLatin(opt)
.getAlpha(opt)
.getNumeric(opt)
.getAlphaNumeric(opt)
.getWord(opt)
opt can be either a number or object
    getLatin(n) - get exactly n words
    getLating({
        min: 10
        max: 100
        setences: 5,
        capitalize: false
        parentheses: true
    })    

.setDefault(opt)
