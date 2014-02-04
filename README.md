## zTooltip v1

Example of using:
##### HTML
```html
<div id="content">
   <span id="tooltip_content_hello">I'm a tooltip</span>
</div>
```
##### JAVASCRIPT
```javascript
$('#content').tooltip({ events      : 'hover',
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

