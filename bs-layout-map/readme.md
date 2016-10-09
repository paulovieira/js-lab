The structure is formed by the following divs:

```html
    div#main-container
        div#navbar-container
        div#map-container
            div#map
        div#footer-container
```

`#main-container` has `position: relative`. All the other containers have  `position: absolute`.

`#navbar-container` and `#footer-container` have both fixed height. The first one is at the top with `top: 0px`. The second one is at the bottom with `bottom: 0px`.

Finally, `map-container` has both `top` and `bottom`, thus defining the height dinamically (it will take the remaining space).

