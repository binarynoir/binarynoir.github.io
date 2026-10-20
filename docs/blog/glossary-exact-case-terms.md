---
title: 'Glossary Tooltips 0.6: exact-case terms'
blog:
  date: 2026-10-16
  summary: markdown-it-glossary 0.6.0 lets a single term match in exact case, or in any case, whatever the rest of the site does.
  tags: [release, glossary]
  category: Plugins
---

# Glossary Tooltips 0.6: exact-case terms

[Glossary Tooltips](/plugins/glossary/) (`markdown-it-glossary`) 0.6.0 adds case flags for single terms.

End a term's heading with `{.exact}` and it only matches in exact case. End it with `{.anycase}` and it matches in any case. Either flag wins over the site, section and page settings, and covers the term's aliases too.

```md
### IT, Information Technology {.exact}

The people and systems that keep the computers running.
```

This is for short acronyms that collide with ordinary words when case is ignored: `IT` would otherwise match "it". See [Case sensitivity](/plugins/glossary/#case-sensitivity) for every level the setting can be made at.

This release also fixes headings with an attribute block, such as a custom anchor (`### CI {#ci}`): the block is no longer read as part of the term.
