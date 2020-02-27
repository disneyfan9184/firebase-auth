## Modal Forms

Materialize uses the data-target attribute to target the modal element that has the same id.  
Example:

```html
<a href="#" class="grey-text modal-trigger" data-target="modal-signup"
  >Sign up</a
>
```

In this case we have data-target = "modal-signup" which will target the following div with the id = "modal-signup. Materialize also recognizes the div as a modal because it's class="modal"

```html
<div id="modal-signup" class="modal">
  <div class="modal-content">
    <h4>Sign up</h4>
  </div>
</div>
`
```

When the anchor tag Sign up is clicked it will tell materialize css to open the model form.
