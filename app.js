const templatePlaceholder = `<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
<button class="my-button">Click</button>`

const modelPlaceholder = `{
  "title": "Title",
  "body": "Body"
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

compileButton.addEventListener('click', () => {
  const template = Handlebars.compile(templateEditor.getValue());
  const context = JSON.parse(modelEditor.getValue());
  const html = template(context);
  preview.innerHTML = html;
});

preview.addEventListener("click", (e) => console.log(e.target.className));

const appRoot = document.getElementById("app-root");

console.log(appRoot);