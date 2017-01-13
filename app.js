const templatePlaceholder = `<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
<button class="my-button" data-action="">Click</button>`

const modelPlaceholder = `{
  "people": [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
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
console.log(preview.getAttribute("dataAction") == undefined);

let context;

compileButton.addEventListener('click', () => {
  const template = Handlebars.compile(templateEditor.getValue());
  context = JSON.parse(modelEditor.getValue());
  const html = template(context);
  preview.innerHTML = html;
});

const handleClick = function(e) {
  context.people.push("Matthew Greenberg");
  const template = Handlebars.compile(templateEditor.getValue());
  const html = template(context);
  preview.innerHTML = html;
}

preview.addEventListener("click", handleClick);

const appRoot = document.getElementById("app-root");

console.log(appRoot);