const templatePlaceholder = `{{#each people}}
    <p><label>Name:</label><input class="form-control" value="{{name}}" data-path="people[{{@index}}].name"></p>
    <label>Kids:</label>
    {{#each kids}}
      <div class="input-group">
        <input class="form-control" value="{{this}}" data-path="people[{{@../index}}].kids[{{@index}}]">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" data-action="REMOVE" data-path="people[{{@../index}}].kids[{{@index}}]">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </span>
      </div>
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

const ancestor = (elt, stop, test) => test(elt) ? elt :
  (elt == stop) ? null : ancestor(elt.parentElement, stop, test);

let context;

compileButton.addEventListener('click', () => {
  const template = Handlebars.compile(templateEditor.getValue());
  context = JSON.parse(modelEditor.getValue());
  const html = template(context);
  preview.innerHTML = html;
});

const handleInput = function(e) {
  _.set(context, e.target.dataset.path, e.target.value);
  console.log(`context: ${JSON.stringify(context)}`);
}

preview.addEventListener("input", handleInput);

const handleClick = function(e) {
  console.log(e.target);
  const target = ancestor(e.target, preview, (elt) => 
    (elt.hasAttribute("data-path") && elt.hasAttribute("data-action"))
  );
  console.log(target);
  if (target) {
    const action = target.dataset.action;
    const path = target.dataset.path;
    console.log(`action: ${action}, path: ${path}`);
    switch (action) {
      case "ADD":
        let array = _.get(context, path);
        if (!Array.isArray(array)) {
          array = _.get(_.set(context, path, []), path);
        }
        array.push(null);
        break;
      case "REMOVE":
        console.log("case remove");
        _.unset(context, path);
        break;
      default:
        console.log("default");
    }
    const template = Handlebars.compile(templateEditor.getValue());
    const html = template(context);
    preview.innerHTML = html;
  }
}

preview.addEventListener("click", handleClick);

contextButton = document.getElementById("get-context");
contextButton.addEventListener("click", () => console.log(JSON.stringify(context, null, 2)));
