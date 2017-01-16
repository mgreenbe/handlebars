export const templatePlaceholder = `{{#each people}}
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

export const modelPlaceholder = `{
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

