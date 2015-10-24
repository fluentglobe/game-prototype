{% autoescape false %}
'use strict';

var plan = {{ plan|json }};
planTheDay({{ day }},plan);
