## Motivation

~/my-app/
    a/
        templates/
            template-a1.html
            template-a1.ctx.html
            template-a2.html
    b/
        templates/
            template-b1.html
            template-b1.ctx.html

cd ~/my-app/visual-states
node index.js ..
loadTemplates("")


## Templates

`ĺoadTemplates` will create an internal object to store the information about the loaded templates. The structure of this internal object is:



     - key: the path to the template file (this works as the id of the template)
     - value: an object with the structure:
        * path: the same as the respective key ()
        * source: the raw contents of the template file (text)
        * engine: an indentifier of the template engine that will be used to render the template. Currently supported engine: nunjucks
        * ctx: an object with the available contexts for this template (to be passed to the template engine). by default there is always a "default" context (which should be in the 



browser-sync start --server --directory --files "output/**/*.html, states/**/*.css"
