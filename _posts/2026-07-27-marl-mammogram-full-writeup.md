---
title: "Cooperative MARL for Mammogram ROI Classification, in Full"
excerpt: "The full write-up behind the MARL portfolio entry — POMDP formulation, the five-module agent architecture, and an honest read of a result that doesn't beat CNN baselines."
tags:
  - Research
  - Reinforcement Learning
---

![MARL mammogram ROI classification](/images/mammo.png)

Sixteen reinforcement-learning agents independently scan small patches of a mammogram region of interest, communicate, and reach a consensus classification (benign/malignant) — without any single agent ever seeing the whole image. 82.45% accuracy on CBIS-DDSM. Published at IEEE ICDABI 2023, presented virtually.

[Code](https://github.com/manchitro/marl-cbis-ddsm) · [Paper (DOI: 10.1109/ICDABI60145.2023.10629500)](https://doi.org/10.1109/ICDABI60145.2023.10629500)

## Problem

Breast carcinoma caused roughly 685,000 deaths in 2020 — 25% of that year's 2.26 million new cases — and about 13% of women face a lifetime risk of developing it. Mammography is the standard screening tool, but reading mammograms is resource-intensive and requires expert radiologists, which is a bottleneck on early detection. Decades of computer-aided detection research have targeted this, but almost all of it — from classical ML through modern deep CNNs (state-of-the-art methods on CBIS-DDSM reach 95%+ accuracy) — processes the **whole image at once**. Parameter counts for these models scale with image resolution, an increasingly real cost as medical imaging resolution keeps climbing.

Reinforcement learning for this specific problem was, at the time, relatively unexplored. The question this project asks: what if, instead of one large model consuming the whole image, many small agents each look at a tiny local patch, share what they see with each other, and reach a *decentralized* consensus — does that reduce the computational burden of scaling with image size, while staying accurate enough to be useful? The architecture is adapted from prior multi-agent image classification work demonstrated on MNIST — this project's contribution is extending that general framework to the harder, real task of mammogram ROI classification.

## Architecture

The task is framed as a partially observable Markov Decision Process (POMDP): an 8-tuple ⟨I, N, S, A, P, π, O, γ⟩ — the image, agent count, state space (agent positions), action space (`{up, down, left, right}`), position-transition function, action policy, local-observation function, and discount factor. Each of the 16 agents runs five modules per timestep:

1. **Feature Extraction** — a 4-layer CNN turns the agent's local 24×24px window into a 128-dimensional feature vector.
2. **Position Encoding** — the agent's (x, y) coordinates pass through a fully-connected layer, GELU activation, and batch normalization.
3. **Decision** — an LSTM aggregates the agent's full observation history (its own features, position encoding, and the averaged messages received from other agents), then a small policy network outputs a probability distribution over the four move directions.
4. **Prediction** — a second, separate LSTM tracks a running benign/malignant belief from the same inputs, independent of the movement decision.
5. **Communication** — each agent generates a message from its prediction-LSTM hidden state, broadcasts it, and every other agent decodes and averages all incoming messages, feeding that average back into both LSTMs next timestep.

After a fixed episode length (32 steps by default), each agent emits a raw prediction vector; the system's final classification is the argmax of the softmax-averaged predictions across all 16 agents. Training uses REINFORCE (policy-gradient) with an Adam optimizer — the reward for a sampled trajectory is the cross-entropy loss between that trajectory's predicted and true label.

The key idea worth stating plainly: **no agent ever sees the whole image, and there's no central controller** — classification emerges from many small, partial, locally-informed views reaching agreement through message-passing. That's a genuinely different shape of solution than "bigger CNN, more parameters," even though it doesn't currently win on raw accuracy (see Results).

## Dataset

CBIS-DDSM (Curated Breast Imaging Subset of DDSM), **mass images only** — calcification images were explicitly out of scope, left as future work. ROIs (professionally radiologist-annotated) resized to 224×224, retaining full aspect information.

| | Benign | Malignant | Total |
|---|---|---|---|
| Train | 681 | 637 | 1,318 |
| Test | 231 | 147 | 378 |
| **Total** | **912** | **784** | **1,696** |

Augmentation (horizontal flip, vertical flip, 90°/180°/270° rotation, and combinations) produced 12 copies per training image, expanding the training set to 15,816 images.

## Training setup

100 epochs, mini-batch size 32, LSTM hidden size 256, message size 64, 16 agents with a 24×24px observation window, 32 steps per episode, discount factor γ=0.99, learning rate 1e-4, Adam optimizer.

## Results

| Metric | Train (top-1) | Eval |
|---|---|---|
| F1 | 0.916 | 0.81 |
| Accuracy | — | 82.45% |
| Precision | — | 81.73% |
| Recall | — | 81.00% |

**Comparison against other published methods on the same dataset (CBIS-DDSM, mass images):**

| Method | Year | Accuracy |
|---|---|---|
| Jabeen et al. | 2023 | 95.40% |
| Baccouche et al. | 2022 | 95.13% |
| Muduli et al. | 2022 | 90.68% |
| Ragab et al. | 2019 | 87.20% |
| **This method** | 2023 | **82.45%** |
| Khan et al. | 2019 | 77.66% |

The honest framing: this doesn't beat CNN-based state of the art on raw accuracy — it lands in the middle of a six-method comparison table, behind four CNN-based methods and ahead of one. The paper's own conclusion is blunt about this: the model is described as far from being useful in the field in its current form. The contribution being claimed is architectural and methodological — a decentralized, partial-observation approach that scales differently with image resolution than whole-image CNN classifiers — not a leaderboard win. That framing is worth keeping intact rather than softened; overstating a result like this is exactly what undermines credibility with a technical reviewer.

## Honest limitations

1. **Single dataset** — evaluated only on CBIS-DDSM; generalization to other mammogram datasets untested.
2. **Single abnormality type** — trained only on mass images, not calcifications, which look visually distinct and would need separate evaluation.
3. **Accuracy trails CNN competitors** — see table above.
4. **Requires pre-annotated ROIs** — the system classifies a given ROI, it doesn't locate the ROI on a raw, unmarked mammogram itself. Full automation would need an ROI-localization step on top of this.

Full code, training scripts, and the complete README are on [GitHub](https://github.com/manchitro/marl-cbis-ddsm).
