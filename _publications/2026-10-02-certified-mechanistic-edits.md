---
title: "Certified Mechanistic Edits: Behavioral Guarantees for Skill Removal and Preservation"
collection: publications
category: preprints
permalink: /publication/2026-10-02-certified-mechanistic-edits
excerpt: 'Behavioral guarantees that disabling a circuit removes one skill and provably preserves another, for every input in a region, using sound bound propagation from toy ReLU networks to softmax + LayerNorm transformers.'
date: 2026-10-02
venue: 'arXiv preprint arXiv:2610.03502'
venue_url: 'https://arxiv.org/'
paperurl: 'https://doi.org/10.48550/arXiv.2610.03502'
citation: 'Uddin, M. S., Mazumder, M. K. A., &amp; Mridha, M. F. (2026). &quot;Certified Mechanistic Edits: Behavioral Guarantees for Skill Removal and Preservation.&quot; <i>arXiv preprint arXiv:2610.03502</i>.'
bibtex: |
  @misc{uddin2026certified,
    title         = {Certified Mechanistic Edits: Behavioral Guarantees for Skill Removal and Preservation},
    author        = {Uddin, Md Sazid and Mazumder, Md. Khairul Alam and Mridha, M. F.},
    year          = {2026},
    eprint        = {2610.03502},
    archivePrefix = {arXiv},
    primaryClass  = {cs.LG},
    doi           = {10.48550/arXiv.2610.03502}
  }
---

A formal verification approach for mechanistic edits in neural networks: behavioral guarantees that disabling a circuit removes one skill and provably preserves another, for every input in a region. The method applies from toy ReLU networks to standard softmax + LayerNorm transformers, using sound bound propagation to certify edits across continuous embedding-space regions. The paper also proves that testing alone cannot certify skill removal, with an edit that passes comprehensive testing yet provably fails on undiscovered inputs.

The guarantees apply to small standard-architecture networks, and they require that target skills have decidable specifications, a condition real-world harms may not satisfy.

Preprint, not peer reviewed. arXiv categories: cs.LG, cs.AI, cs.CR. 12 pages, 6 figures, 4 tables (v2).

Paper: [arXiv:2610.03502](https://arxiv.org/abs/2610.03502)
