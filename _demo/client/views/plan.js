{% autoescape false %}
Fluent.planTheDay({{ day }},{{ plan|json }}, {{ options|json }}).then(function(plan) {
  plan.queue(0);
});
