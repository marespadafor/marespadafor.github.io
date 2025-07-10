---
layout: page
permalink: /publications/
title: publications
description: 
years: [2025,2023,2022,2021]
nav: true
nav_order: 1
---

Here you can find a list of my publications. If you cannot access any of the papers listed below, please email me. I would be happy to share it!

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}

</div>
