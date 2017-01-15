const templatePlaceholder = `{{#each people}}
    <p><label>Name:</label><input class="form-control" value="{{name}}" data-path="people[{{@index}}].name"></p>
    <label>Kids:</label>
    {{#each kids}}
        <input class="form-control" value="{{this}}" data-path="people[{{@../index}}].kids[{{@index}}]">
        {{/each}}
    <button class="btn btn-default" data-action="ADD" data-path="people[{{@index}}].kids">Add kid</button>
    <br><br>
{{/each}}
<button class="btn btn-default" data-action="ADD" data-path="people">Add person</button>`

const modelPlaceholder = `{
    "people": [
        {
            "name": "Matt",
            "kids": ["Max", "Enna"]
        },
        {
            "name": "Erik",
            "kids": ["Bjorn", "Soren"]
        }
    ]
}`;

const templateEditor = ace.edit("template-editor");
templateEditor.$blockScrolling = Infinity;
templateEditor.setValue(templatePlaceholder);
templateEditor.clearSelection();
templateEditor.setTheme("ace/theme/chrome");
templateEditor.getSession().setMode("ace/mode/handlebars");
 
const modelEditor = ace.edit("model-editor");
modelEditor.$blockScrolling = Infinity;
modelEditor.setValue(modelPlaceholder);
modelEditor.clearSelection();
modelEditor.setTheme("ace/theme/chrome");
modelEditor.getSession().setMode("ace/mode/json");
 
const compileButton = document.getElementById("compile-button");
const preview = document.getElementById("preview");
preview.template = "TeMpLaTe";

let context;

compileButton.addEventListener('click', () => {
  const template = Handlebars.compile(templateEditor.getValue());
  context = JSON.parse(modelEditor.getValue());
  const html = template(context);
  preview.innerHTML = html;
});

// const handleClick = function(e) {
//   context.people.push("Matthew Greenberg");
//   const template = Handlebars.compile(templateEditor.getValue());
//   const html = template(context);
//   preview.innerHTML = html;
// }

const handleInput = function(e) {
  _.set(context, e.target.dataset.path, e.target.value);
  console.log(`context: ${JSON.stringify(context)}`);
}

preview.addEventListener("input", handleInput);

const handleClick = function(e) {
  if (e.target.hasAttribute("data-path") && e.target.hasAttribute("data-action")) {
    const path = e.target.dataset.path;
    let array = _.get(context, path);
    if (!Array.isArray(array)) {
      array = _.get(_.set(context, path, []), path);
    }
    array.push(null);
    const template = Handlebars.compile(templateEditor.getValue());
    const html = template(context);
    preview.innerHTML = html;
  }
}

preview.addEventListener("click", handleClick);
