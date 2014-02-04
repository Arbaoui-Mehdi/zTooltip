## zTooltip

Example of using:
##### HTML
```html

<!-- Tooltip -->
<span id="tooltip_content_hello">I'm a tooltip</span>

<!-- Tooltip Content-->
<span id="content_hello">
	<h3>Content 1</h3>
	<p>
	 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, dignissimos,
	 harum saepe consequuntur rem et enim numquam tenetur quaerat ex excepturi veniam
	 voluptas eaque explicabo in debitis sed. Natus, quas?
	</p>
</span>

```
##### JAVASCRIPT
```javascript
$('body').tooltip({ events      : 'hover',
                        width       :  300,
                        position    : 'configurable',
                        bgcolor     : '#000',
                        textcolor   : '#fff',
                        rightoleft  : false,
                        boxshadow   : { params : '1px 1px 3px 0',
                                        color  : 'rgba(68,68,68,0.2)' },
                        borderadius : { size : '5px' }
});
```

